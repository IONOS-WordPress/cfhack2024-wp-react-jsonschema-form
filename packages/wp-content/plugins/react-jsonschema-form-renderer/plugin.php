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
        /**
         * register our script/style
         */
        $HANDLE = str_replace('_', '-', __NAMESPACE__);

        $SETTINGS_PAGE_HANDLE = "{$HANDLE}-settings-page";
        $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/settings-page.asset.php');
        \wp_enqueue_script(
          $SETTINGS_PAGE_HANDLE,
          \plugins_url( 'build/settings-page.js', __FILE__ ),
          $asset_file['dependencies'],
          $asset_file['version'],
          true,
        );
        \wp_set_script_translations($SETTINGS_PAGE_HANDLE, $SETTINGS_PAGE_HANDLE);
        \wp_add_inline_script(
          $SETTINGS_PAGE_HANDLE,
          "window['jsonschema_plugin_settings_page']=" . json_encode([
            '_wpnonce' => wp_create_nonce( 'options-options' ),
            'value' => \get_option('jsonschema_plugin_settings_page', '{}'),
            'jsonschema' => file_get_contents(__DIR__ . '/settings-page-jsonschema.json'),
            'jsonschema-ui' => file_get_contents(__DIR__ . '/settings-page-jsonschema-ui.json')
          ]),
          'before',
        );
        \wp_enqueue_style(
          $SETTINGS_PAGE_HANDLE,
          \plugins_url('build/settings-page.css', __FILE__),
          ['wp-components'], //$asset_file['dependencies'],
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


