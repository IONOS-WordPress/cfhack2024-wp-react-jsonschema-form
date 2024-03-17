<?php
/**
 * Plugin Name:       settings-page
 * Description:       provides a WordPress plugin settings page utilizing react-jsonschema-form
 * Requires at least: 6.4
 * Requires Plugins:  rjsf-renderer
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       settings-page
 */

namespace cfhack2024_wp_react_jsonschema_form\settings_page;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

\add_action(
  "admin_menu",
  function () {
    $menu_page_hook_suffix = \add_menu_page('Settings page', 'Settings page', 'manage_options', 'settings_page', function () {
      require_once ABSPATH . 'wp-admin/admin-header.php';

      echo '<div class="wrap" id="settings-page"></div>';

      require_once ABSPATH . 'wp-admin/admin-footer.php';
    }, \plugins_url( 'assets/icon.svg', __FILE__ ));

    \add_action(
      'load-' . $menu_page_hook_suffix,
      function () {
        /**
         * register our script/style
         */
        $HANDLE = str_replace('_', '-', __NAMESPACE__);

        $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

        \wp_enqueue_script(
          $HANDLE,
          \plugins_url( 'build/index.js', __FILE__ ),
          array_merge( $asset_file['dependencies'], ['rjsf-gutenberg-renderer']),
          $asset_file['version'],
          true,
        );
        \wp_set_script_translations($HANDLE, $HANDLE);
        \wp_add_inline_script(
          $HANDLE,
          "window['settings_page']=" . json_encode([
            '_wpnonce' => wp_create_nonce( 'options-options' ),
            'value' => \get_option('settings_page', '{}'),
            'schema' => file_get_contents(__DIR__ . '/jsonschema.json'),
            'uiSchema' => file_get_contents(__DIR__ . '/jsonschema-ui.json')
          ]),
          'before',
        );

        \wp_enqueue_style(
          $HANDLE,
          \plugins_url('build/index.css', __FILE__),
          ['wp-components', 'rjsf-gutenberg-renderer'], //$asset_file['dependencies'],
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

\add_filter( 'plugin_action_links_' . \plugin_basename(__FILE__), function ( $actions ) {
  array_unshift(
    $actions,
    "<a href='" . \menu_page_url( 'settings_page', false) . "'>" . __( 'Settings' ) . '</a>'
  );
  return $actions;
});


