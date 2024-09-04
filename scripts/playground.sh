#!/bin/bash

# This script is a wrapper for building and zipping all Plugins and writing a new playground configuration.
# It uses the following environment variables:
# - BRANCH_NAME: The name of the branch to use for the playground URL. Defaults to the current branch name.
# - GITHUB_URL: The URL to the raw files on GitHub. Defaults to the gh-pages branch of the current repository.
# - PLUGINS: The list of plugins to build and bundle. Defaults to all plugins in the packages/wp-content/plugins folder.

# Define fallback values for the variables
BRANCH_NAME="${BRANCH_NAME:-$(git rev-parse --abbrev-ref HEAD)}"
GITHUB_URL="${GITHUB_URL:-https://raw.githubusercontent.com/IONOS-WordPress/cfhack2024-wp-react-jsonschema-form/gh-pages/$BRANCH_NAME}"
PLUGINS="${PLUGINS:-$(find packages/wp-content/plugins -mindepth 1 -maxdepth 1 -type d)}"

Main() {
    TARGET_HOST="$1"
    TARGET_FOLDER="$2"

    if [ -z "$TARGET_FOLDER" ]; then
       TARGET_FOLDER="$(git rev-parse --abbrev-ref HEAD)"
       echo "No target folder provided. Using the current branch name as the target folder: $TARGET_FOLDER"
    fi

    if [ -z "$TARGET_HOST" ]; then
       echo "Could not determine the target remote host. aborting."
       return 1
    fi

    DIST_FOLDER="dist/$TARGET_FOLDER"
    mkdir -p $DIST_FOLDER

    printf "%s\n" "Building all plugins"
    pnpm install --frozen-lockfile &> /dev/null
    pnpm build &> /dev/null
    printf "%s\n" "All plugins have been built"

    source ./scripts/bundlePlugins.sh "$PLUGINS"  "$DIST_FOLDER"
    source ./scripts/writePlayground.sh "$PLUGINS" "$DIST_FOLDER" "$TARGET_HOST" "$TARGET_FOLDER"
}


Main "$@"
