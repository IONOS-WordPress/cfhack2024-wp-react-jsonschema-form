<?php

namespace cfhack2024_wp_react_jsonschema_form\theme_extending_global_styles_jsonschema;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * register our editor sidebar extension
 */
\add_action('enqueue_block_editor_assets', function () {
  $HANDLE = str_replace('_', '-', __NAMESPACE__);

  $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

  \wp_enqueue_script(
    $HANDLE,
    \get_stylesheet_directory_uri() . '/build/index.js',
    $asset_file['dependencies'],
    $asset_file['version']
  );
  \wp_set_script_translations($HANDLE, $HANDLE);

  \wp_enqueue_style(
    $HANDLE,
    \get_stylesheet_directory_uri() . '/build/index.css',
    ['wp-components'], //$asset_file['dependencies'],
    $asset_file['version']
  );
});

\add_action( 'wp_enqueue_scripts', fn() => \wp_enqueue_style(
  'theme-extending-global-styles-jsonschema',
  \get_stylesheet_uri()
));
