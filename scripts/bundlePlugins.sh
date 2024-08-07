#!/bin/bash

bundlePlugins() {
    local PLUGINS=$1
    local DIST_FOLDER=$2
    local BASE_DIR=$(pwd)
    local BUNDLE_DIR="$BASE_DIR/$DIST_FOLDER"
    local GIT_COMMIT=$(git rev-parse HEAD)

    if [[ -z "$PLUGINS" ]]; then
        printf "[ERROR] %s\n" "Usage: bundlePlugins <path> <dist-folder>"
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
    zip -r "$PLUGIN_ZIP" . -x ".pnpm-store" -q &> /dev/null
    cd "$BASE_DIR"
}

# Example usage
PLUGINS=$1
DIST_FOLDER=$2

bundlePlugins "$PLUGINS" "$DIST_FOLDER"

