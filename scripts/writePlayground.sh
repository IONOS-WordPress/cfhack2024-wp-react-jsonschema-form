#!/bin/bash

# Declare the necessary associative arrays and variables
declare -A PluginDeps
declare -A visited
declare -A onStack
SortedPlugins=()

# Function to sort plugins topologically
topologicalSort() {
    for plugin in "${!PluginDeps[@]}"; do
        if [[ -z "${visited[$plugin]}" ]]; then
            visit "$plugin"
        fi
    done
}

# Function to visit plugins for topological sorting
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

# Function to sort plugins
sortPlugins() {
    local PLUGINS=$1

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

# Function to write playground JSON
writePlaygroundJson() {
    printf "[INFO] %s\n" "Writing playground configuration"
    local -n SORTED_PLUGINS=$1
    local BUNDLE_DIR=$2
    local TARGET_HOST=$3
    local BRANCH_NAME=$4
    local GITHUB_URL="https://raw.githubusercontent.com/$TARGET_HOST/gh-pages/$BRANCH_NAME"

    printf "{
    \"steps\": [
        {
          \"step\": \"login\",
          \"username\": \"admin\",
          \"password\": \"password\"
        }," > "$BUNDLE_DIR/playground.json"

    for PLUGIN in "${SORTED_PLUGINS[@]}"; do
        local PLUGIN_NAME=$(basename "$PLUGIN")
        local PLUGIN_ZIP="$PLUGIN_NAME.zip"
        printf "        {
            \"step\": \"installPlugin\",
            \"pluginZipFile\": {
                \"resource\": \"url\",
                \"url\": \"$GITHUB_URL/$PLUGIN_ZIP\"
            }
        }," >> "$BUNDLE_DIR/playground.json"
    done

    # Remove the trailing comma after appending all plugins
    sed -i '$ s/,$//' "$BUNDLE_DIR/playground.json"

    printf "    ]
}" >> "$BUNDLE_DIR/playground.json"

  printf "[INFO] %s\n" "playground config has been written to $BUNDLE_DIR/playground.json"
}

# Main function to sort plugins and write playground JSON
main() {
    local PLUGINS=$1
    local BUNDLE_DIR=$2
    local TARGET_HOST=$3
    local TARGET_FOLDER=$4

    sortPlugins "$PLUGINS"
    writePlaygroundJson SortedPlugins "$BUNDLE_DIR" "$TARGET_HOST" "$TARGET_FOLDER"
}

# Execute main function
main "$@"

