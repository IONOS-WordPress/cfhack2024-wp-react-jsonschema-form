#!/bin/bash

# Function to build plugins
buildPlugins() {
    printf "%s\n" "Building all plugins"
    pnpm install --frozen-lockfile &> /dev/null
    pnpm build &> /dev/null
    printf "%s\n" "All plugins have been built"
}

# Execute deploy function
buildPlugins
