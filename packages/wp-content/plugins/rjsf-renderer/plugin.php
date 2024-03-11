<?php
/**
 * Plugin Name:       rjsf-renderer
 * Description:       provides a WordPress plugin exposing react-jsonschema-form renderers
 * Requires at least: 6.4
 * Requires PHP:      8.3
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rjsf-renderer
 */

namespace cfhack2024_wp_react_jsonschema_form\rjsf_renderer;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * registers the Gutenberg renderer script in WordPress using handle "rjsf-gutenberg-renderer".
 */
function __registerRjsfGutenbergRenderer() {
  $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/rjsf-renderer-gutenberg.asset.php');

  $HANDLE = 'rjsf-gutenberg-renderer';

  \wp_register_script(
    $HANDLE,
    \plugins_url( 'build/rjsf-renderer-gutenberg.js', __FILE__ ),
    [ 'rjsf-core', 'rjsf-utils', 'rjsf-validator', 'wp-components'],
    $asset_file['version'],
  );
  \wp_set_script_translations($HANDLE, $HANDLE);
  \wp_register_style(
    $HANDLE,
    \plugins_url('build/rjsf-renderer-gutenberg.css', __FILE__),
    ['wp-components'],
    $asset_file['version']
  );
}

/**
 * registers the html5 renderer script in WordPress using handle "rjsf-html5-renderer".
 */
function __registerRjsfHtml5Renderer() {
  $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/rjsf-renderer-html5.asset.php');

  $HANDLE = 'rjsf-html5-renderer';

  \wp_register_script(
    $HANDLE,
    \plugins_url( 'build/rjsf-renderer-html5.js', __FILE__ ),
    [ 'rjsf-core', 'rjsf-utils', 'rjsf-validator', 'wp-components'],
    $asset_file['version'],
  );
  \wp_set_script_translations($HANDLE, $HANDLE);
  \wp_register_style(
    $HANDLE,
    \plugins_url('build/rjsf-renderer-html5.css', __FILE__),
    ['wp-components'],
    $asset_file['version']
  );
}

/**
 * registers rjsf-core script in WordPress using handle "rjsf-core".
 */
function __registerRjsfCore() {
  $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/rjsf-core.asset.php');

  $HANDLE = 'rjsf-core';

  \wp_register_script(
    $HANDLE,
    \plugins_url( 'build/rjsf-core.js', __FILE__ ),
    array_merge($asset_file['dependencies'], ['rjsf-utils']),
    $asset_file['version'],
  );
}

/**
 * registers rjsf-validator script in WordPress using handle "rjsf-validator".
 */
function __registerRjsfValidator() {
  $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/rjsf-validator-ajv8.asset.php');

  $HANDLE = 'rjsf-validator';

  \wp_register_script(
    $HANDLE,
    \plugins_url( 'build/rjsf-validator-ajv8.js', __FILE__ ),
    [],
    $asset_file['version'],
  );
}

/**
 * registers rjsf-utils script in WordPress using handle "rjsf-core".
 */
function __registerRjsfUtils() {
  $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/rjsf-utils.asset.php');

  $HANDLE = 'rjsf-utils';

  \wp_register_script(
    $HANDLE,
    \plugins_url( 'build/rjsf-utils.js', __FILE__ ),
    ['lodash'],
    $asset_file['version'],
  );
}

\add_action('init', __NAMESPACE__ . '\__registerRjsfCore');
\add_action('init', __NAMESPACE__ . '\__registerRjsfUtils');
\add_action('init', __NAMESPACE__ . '\__registerRjsfValidator');
\add_action('init', __NAMESPACE__ . '\__registerRjsfGutenbergRenderer');
\add_action('init', __NAMESPACE__ . '\__registerRjsfHtml5Renderer');
