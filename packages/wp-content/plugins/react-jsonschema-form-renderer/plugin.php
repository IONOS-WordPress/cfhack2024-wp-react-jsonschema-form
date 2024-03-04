<?php
/**
 * Plugin Name:       react-jsonschema-form-renderer
 * Description:       provides a WordPress plugin exposing react-jsonschema-form renderers
 * Requires at least: 6.4
 * Requires PHP:      8.3
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       react-jsonschema-form-renderer
 */

namespace cfhack2024_wp_react_jsonschema_form\react_jsonschema_form_renderer;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

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

\add_action(
  "admin_menu",
  function () {
    $menu_page_hook_suffix = \add_menu_page('react-jsonschema-form Renderer Playground', 'react-jsonschema-form Renderer Playground', 'manage_options', 'react_jsonschema_form_renderer_page', function () {
      require_once ABSPATH . 'wp-admin/admin-header.php';

      echo '<div class="wrap" id="react-jsonschema-form-renderer"></div>';

      require_once ABSPATH . 'wp-admin/admin-footer.php';
    }, \plugins_url( 'assets/icon.svg', __FILE__ ));

    \add_action(
      'load-' . $menu_page_hook_suffix,
      function () {
        $HANDLE=str_replace('_', '-', __NAMESPACE__);

        $SETTINGS_PAGE_HANDLE = "{$HANDLE}-settings-page";
        /**
         * register our script/style
         */
        $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/settings-page.asset.php');
        \wp_enqueue_script(
          $SETTINGS_PAGE_HANDLE,
          \plugins_url( 'build/settings-page.js', __FILE__ ),
        array_merge( $asset_file['dependencies'], ['rjsf-gutenberg-renderer', 'rjsf-html5-renderer']),
          $asset_file['version'],
          true,
        );
        \wp_set_script_translations($SETTINGS_PAGE_HANDLE, $SETTINGS_PAGE_HANDLE);
        \wp_add_inline_script(
          $SETTINGS_PAGE_HANDLE,
          "window['jsonschema_plugin_settings_page']=" . json_encode([
            '_wpnonce' => wp_create_nonce( 'options-options' ),
            'value' => \get_option('jsonschema_plugin_settings_page', '{}'),
            'jsonschema' => json_decode( file_get_contents(__DIR__ . '/settings-page-jsonschema.json')),
            'jsonschema-ui' => json_decode( file_get_contents(__DIR__ . '/settings-page-jsonschema-ui.json'))
          ]),
          'before',
        );
        \wp_enqueue_style(
          $SETTINGS_PAGE_HANDLE,
          \plugins_url('build/settings-page.css', __FILE__),
        ['wp-components', 'rjsf-gutenberg-renderer', 'rjsf-html5-renderer'],
          $asset_file['version']
        );

        /*
          prevent loading wp admin forms.css since it breaks gutenberg component styles
          wp_register_style doesn't overwrite exiting style registrations so that we need to
          - remove the original style
          - add a dummy style handle for 'forms'
        */
        \wp_deregister_style('forms');
        \wp_register_style('forms', '');
      },
    );
  },
);

