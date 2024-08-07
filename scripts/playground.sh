#!/bin/bash

BRANCH_NAME="${BRANCH_NAME:-$(git rev-parse --abbrev-ref HEAD)}"
GITHUB_URL="${GITHUB_URL:-https://raw.githubusercontent.com/IONOS-WordPress/cfhack2024-wp-react-jsonschema-form/gh-pages/$BRANCH_NAME}"
PLUGINS="${PLUGINS:-$(find packages/wp-content/plugins -mindepth 1 -maxdepth 1 -type d)}"

Main() {
    TARGET_HOST="$1"
    TARGET_FOLDER="$2"

    if [ -z "$TARGET_FOLDER" ]; then
       TARGET_FOLDER="$(git rev-parse --abbrev-ref HEAD)"
    fi

    DIST_FOLDER="dist/$TARGET_FOLDER"
    mkdir -p $DIST_FOLDER
    source ./scripts/buildPlugins.sh
    source ./scripts/bundlePlugins.sh "$PLUGINS"  "$DIST_FOLDER"
    source ./scripts/writePlayground.sh "$PLUGINS" "$DIST_FOLDER" "$TARGET_HOST" "$TARGET_FOLDER"
}

Main "$@"
