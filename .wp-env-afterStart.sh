
#!/usr/bin/env bash

#
# this script is used to customize the created wp-env instance
#

# build gutenberg for development
pushd "$(pnpm run --silent  wp-env install-path 2> /dev/null)/gutenberg"
NODE_PATH="$(dirname $(which node))/..";
$NODE_PATH/bin/node "$NODE_PATH/lib/node_modules/npm/bin/npm-cli.js" ci
NODE_ENV=development $NODE_PATH/bin/node "$NODE_PATH/lib/node_modules/npm/bin/npm-cli.js" run build || true
popd

# remove dolly demo plugin
rm $(pnpm run --silent wp-env install-path 2> /dev/null)/{tests-WordPress,WordPress}/wp-content/plugins/hello.php

for prefix in '' 'tests-' ; do
  # The wp rewrite flush command regenerates the rewrite rules for your WordPress site, which includes refreshing the permalinks.
  pnpm run wp-env run ${prefix}cli wp --quiet rewrite flush
  # The wp rewrite structure command updates the permalink structure. --hard also updates the .htaccess file
  pnpm run wp-env run ${prefix}cli wp --quiet rewrite structure '/%postname%' --hard

  # activate our theme
  pnpm run wp-env run ${prefix}cli wp --quiet theme activate theme-extending-global-styles-jsonschema
done

