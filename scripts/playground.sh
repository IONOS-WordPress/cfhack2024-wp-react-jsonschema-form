# Simple Utility Function to build a wordpress Plugin
# All Zips will be stored in a gh-branch called $dist-branch
# this branch will store all files
# /dist/<plugin-name>.zip --> <git-commit-hash>/<plugin-name>.zip
# This will allow us to keep track of all versions of the plugin
# and will also allow us to dynamically write a playground.json

checkGitChanges() {
    if [[ -z $(git status --porcelain) ]]; then
        echo "No changes in the repository."
        return 0
    else
        echo "There are uncommitted changes in the repository."
        return 1
    fi
}

Deploy() {
    # Check if there are uncommitted changes
    if ! checkGitChanges; then
        echo "Please commit or stash your changes before deploying."
        exit 1
    fi
    PLUGINS=$(find packages/wp-content/plugins -mindepth 1 -maxdepth 1 -type d)
    # buildPlugins
    bundlePlugins "$PLUGINS"
    uploadDist
}

buildPlugins() {
    printf "%s\n" "Building all plugins"
    pnpm install --frozen-lockfile > /dev/null
    pnpm build > /dev/null
    printf "%s\n" "All plugins have been built"
}

bundlePlugins() {
    local PLUGINS=$1
    local DIST_FOLDER="dist"
    local BASE_DIR=$(pwd)
    local BUNDLE_DIR="$BASE_DIR/$DIST_FOLDER"
    local GIT_COMMIT=$(git rev-parse HEAD)

    if [[ -z "$PLUGINS" ]]; then
        printf "[ERROR] %s\n" "Usage: BundlePlugins <path>"
        return 1
    fi

    if [[ ! -d "$BUNDLE_DIR" ]]; then
        printf "[INFO] %s\n" "Creating bundle directory"
        mkdir -p "$BUNDLE_DIR"
    fi

    printf "[INFO] %s\n" "Bundling all plugins"
    for PLUGIN in $PLUGINS; do
        local PLUGIN_NAME=$(basename $PLUGIN)
        local PLUGIN_ZIP="$BUNDLE_DIR/$PLUGIN_NAME.zip"
        bundlePlugin $PLUGIN $BUNDLE_DIR
    done
    printf "[INFO] %s\n" "All plugins have been bundled"

    sortPlugins "$PLUGINS"
    dumpAssociativeArray SortedPlugins
    writePlaygroundJson SortedPlugins $GIT_COMMIT $BUNDLE_DIR
}

bundlePlugin() {
    local PLUGIN=$1
    local BUNDLE_DIR=$2
    local PLUGIN_NAME=$(basename "$PLUGIN")
    local PLUGIN_ZIP="$BUNDLE_DIR/$PLUGIN_NAME.zip"

    if [[ -z "$PLUGIN" || -z "$BUNDLE_DIR" ]]; then
        printf "[ERROR] %s\n" "Usage: bundlePlugin <path> <bundle-dir>"
        return 1
    fi

    printf "  * %s\n" "Bundling $PLUGIN_NAME"
    cd "$PLUGIN"
    zip -r "$PLUGIN_ZIP" . -x "node_modules/*" -q
    cd "$BASE_DIR"
}

declare -A PluginDeps
SortedPlugins=()

sortPlugins() {
    local PLUGINS=$1
    local GIT_COMMIT=$(git rev-parse --short HEAD)

    if [[ -z "$PLUGINS" ]]; then
        printf "[ERROR] %s\n" "Usage: sortPlugins <plugin-list>"
        return 1
    fi

    printf "[INFO] %s\n" "Sorting all plugins"
    for PLUGIN in $PLUGINS; do
        local PLUGIN_NAME=$(basename "$PLUGIN")
        local PLUGIN_DEPS=$(grep -E "Requires Plugins:" "$PLUGIN/plugin.php" | sort | uniq | awk -F': ' '{print $2}') || ""
        PluginDeps["$PLUGIN_NAME"]="$PLUGIN_DEPS"
        printf "  * %s\n" "Adding $PLUGIN_NAME with dependencies ${PluginDeps[$PLUGIN_NAME]}"
    done

    topologicalSort

    printf "[INFO] %s\n" "All plugins have been sorted"
}

topologicalSort() {
    local -A visited
    local -A onStack

    for plugin in "${!PluginDeps[@]}"; do
        if [[ -z "${visited[$plugin]}" ]]; then
            visit "$plugin"
        fi
    done
}

visit() {
    local plugin=$1

    if [[ "${onStack[$plugin]}" == "true" ]]; then
        printf "[ERROR] %s\n" "Circular dependency detected with $plugin"
        exit 1
    fi

    if [[ -z "${visited[$plugin]}" ]]; then
        onStack["$plugin"]="true"
        IFS=', ' read -r -a dependencies <<< "${PluginDeps[$plugin]}"
        for dep in "${dependencies[@]}"; do
            if [[ -n "$dep" ]]; then
                visit "$dep"
            fi
        done
        onStack["$plugin"]="false"
        visited["$plugin"]="true"
        SortedPlugins+=("$plugin")
    fi
}

dumpAssociativeArray() {
    local -n array=$1
    printf "[INFO] %s\n" "Determined order of plugins"
    for key in "${!array[@]}"; do
        printf "  %s: %s\n" "$key" "${array[$key]}"
    done
}

writePlaygroundJson() {
    printf "[INFO] %s\n" "Writing playground.json"
    local -n SORTED_PLUGINS=$1
    local GIT_COMMIT=$2
    local BUNDLE_DIR=$3
    local GITHUB_URL="https://raw.githubusercontent.com/IONOS-WordPress/cfhack2024-wp-react-jsonschema-form/playground/$GIT_COMMIT"

    echo $SORTED_PLUGINS
    echo $GIT_COMMIT
    echo $BUNDLE_DIR

    echo "{
    \"steps\": [
        {
          \"step\": \"login\",
          \"username\": \"admin\",
          \"password\": \"password\"
        }," > "$BUNDLE_DIR/playground.json"


    # {
    #   "step": "installPlugin",
    #   "pluginZipFile": {
    #     "resource": "url",
    #     "url": "https://raw.githubusercontent.com/IONOS-WordPress/cfhack2024-wp-react-jsonschema-form/playground/8f49998a7b358c43a5c836664324d95f8e618202/form-block.zip"
    #   }
    # },
    for PLUGIN in "${SORTED_PLUGINS[@]}"; do
        local PLUGIN_NAME=$(basename "$PLUGIN")
        local PLUGIN_ZIP="$PLUGIN_NAME.zip"
        echo "        {
            \"step\": \"installPlugin\",
            \"pluginZipFile\": {
                \"resource\": \"url\",
                \"url\": \"$GITHUB_URL/$PLUGIN_ZIP\"
            }
        }," >> "$BUNDLE_DIR/playground.json"
    done

    echo "    ]
}" >> "$BUNDLE_DIR/playground.json"
}

uploadDist() {
    # Ensure we are on a clean branch without any changes
    checkGitChanges

    local DIST_FOLDER="dist"
    local BASE_DIR=$(pwd)
    local GIT_COMMIT=$(git rev-parse HEAD)
    local BUNDLE_DIR="$BASE_DIR/$DIST_FOLDER"
    local original_branch=$(git rev-parse --abbrev-ref HEAD)

    # add everything in $BUNDLE_DIR the "playground" branch
    git checkout playground
    git add "$BUNDLE_DIR"
    git commit -m "Build $GIT_COMMIT"
    git push origin playground
    git checkout $original_branch


}

Deploy

