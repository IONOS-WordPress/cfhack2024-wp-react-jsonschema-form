<?php
/**
 * Plugin Name:       gutenberg-editor-sidebar-plugin
 * Description:       provides a WordPress plugin declaring a Gutenberg editor sidebar plugin rendered using react-jsonschema-form
 * Requires at least: 6.3
 * Requires PHP:      8.3
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-editor-sidebar-plugin
 */

namespace cfhack2024_wp_react_jsonschema_form\gutenberg_editor_sidebar_plugin;

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
    \plugins_url( 'build/index.js', __FILE__ ),
    $asset_file['dependencies'],
    $asset_file['version']
  );
  \wp_set_script_translations($HANDLE, $HANDLE);

  \wp_enqueue_style(
    $HANDLE,
    \plugins_url('build/index.css', __FILE__),
    $asset_file['dependencies'],
    $asset_file['version']
  );
});

/**
 * Registers the custom_post_meta field.
 */
\add_action( 'init', fn() => \register_post_meta(
  'page',
  'our_data',
  [
      'type'         => 'string',
      'show_in_rest' => true,
      'single'       => true,
  ]
));
