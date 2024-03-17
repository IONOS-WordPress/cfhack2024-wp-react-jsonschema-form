<?php
/**
 * Plugin Name:       rjsf-renderer-playground
 * Description:       Exposing a react-renderer playground page
 * Requires at least: 6.4
 * Requires Plugins:  rjsf-renderer
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rjsf-renderer-playground
 */

namespace cfhack2024_wp_react_jsonschema_form\rjsf_renderer_playground;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/*
  register admin menu to WordPress admin dashboard
*/
\add_action(
  "admin_menu",
  function () {
    $menu_page_hook_suffix = \add_menu_page('rjsf-renderer Playground', 'rjsf-renderer Playground', 'manage_options', 'rjsf_renderer_playground', function () {
      require_once ABSPATH . 'wp-admin/admin-header.php';

      // inject a html element with a unique id where our component should get rendered
      echo '<div class="wrap" id="rjsf-renderer-playground"></div>';

      require_once ABSPATH . 'wp-admin/admin-footer.php';
    }, \plugins_url( 'assets/icon.svg', __FILE__ ));

    \add_action(
      'load-' . $menu_page_hook_suffix,
       /*
          register our bundled js script/css style containing the settings page playground
       */
      function () {
        $HANDLE=str_replace('_', '-', __NAMESPACE__);

        $SETTINGS_PAGE_HANDLE = "{$HANDLE}-playground";
        /*
          register our js file to be loaded into the settings page playground
        */
        $asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
        \wp_enqueue_script(
          $SETTINGS_PAGE_HANDLE,
          \plugins_url( 'build/index.js', __FILE__ ),
          /*
            IMPORTANT : the script depends on both generated dependencies in index.php
            AND our used renderer dependencies (at least one of 'rjsf-gutenberg-renderer' or 'rjsf-html5-renderer')
          */
          array_merge( $asset_file['dependencies'], ['rjsf-gutenberg-renderer', 'rjsf-html5-renderer']),
          $asset_file['version'],
          true,
        );
        \wp_set_script_translations($SETTINGS_PAGE_HANDLE, $SETTINGS_PAGE_HANDLE);
        \wp_add_inline_script(
          $SETTINGS_PAGE_HANDLE,
          "window['rjsf-renderer-playground']=" . json_encode([
            /*
              provide the json schema file defining the structure of the form to the frontend
            */
            'jsonschema' => json_decode( file_get_contents(__DIR__ . '/playground-jsonschema.json')),
            /*
              provide the json schema ui file defining the individual form rendering customization to the frontend
            */
            'jsonschema-ui' => json_decode( file_get_contents(__DIR__ . '/playground-jsonschema-ui.json'))
          ]),
          'before',
        );
        /*
          register our css file to be loaded into the settings page playground
        */
        \wp_enqueue_style(
          $SETTINGS_PAGE_HANDLE,
          \plugins_url('build/index.css', __FILE__),
          /*
            IMPORTANT : the style depends on our used renderer dependencies (at least one of 'rjsf-gutenberg-renderer' or 'rjsf-html5-renderer')
          */
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

\add_filter( 'plugin_action_links_' . \plugin_basename(__FILE__), function ( $actions ) {
  array_unshift(
    $actions,
    "<a href='" . \menu_page_url( 'rjsf_renderer_playground', false) . "'>" . __( 'Playground' ) . '</a>'
  );
  return $actions;
});

