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
    ['wp-components'], //$asset_file['dependencies'],
    $asset_file['version']
  );
});

/**
 * Registers the custom_post_meta field.
 */
\add_action( 'init', fn() => \register_post_meta(
  'page',
  'gutenberg-editor-sidebar-plugin-data',
  [
    'single'       => true,
    'type'         => 'string',
    'default'      => '{ "hi" : "ho" }',
    'show_in_rest' => array(
        'schema' => array(
            'type'  => 'string',
        ),
    ),
  ]
));

/**
 * Add custom Meta Tags to header.
 */
\add_action( 'wp_head', function () {
  $post_id = \get_the_ID();

  $value = get_post_meta( get_the_ID(), 'gutenberg-editor-sidebar-plugin-data', true );

  if( ! \get_post_meta( $post_id, 'gutenberg-editor-sidebar-plugin-data', true ) ) {
    return;
  }
  if( ! \get_post_meta( $post_id, 'gutenberg-editor-sidebar-plugin-data', false ) ) {
    return;
  }
  // both ifs will get run if no meta field is found; since
  // array() == false and '' == false

  // @TODO evaluate post meta gutenberg-editor-sidebar-plugin-data JSON data and echo the matching <meta> tags
  $data = \get_post_meta( $post_id, 'gutenberg-editor-sidebar-plugin-data', true );
  echo "<!-- gutenberg-editor-sidebar-plugin-data $data -->";

  /*
    example headers to inject into page

    <meta name="resource-type" content="document">
    <meta http-equiv="content-type" content="text/html; charset=US-ASCII">
    <meta http-equiv="content-language" content="en-us">
    <meta name="author" content="John Doe">
    <meta name="contact" content="johndoe@johndoe.com">
    <meta name="copyright" content="Copyright (c)2010-2020
    John Doe. All Rights Reserved.">
    <meta name="description" content="Tutorial on meta tags.">
    <meta name="keywords" content="tutorial, meta tags, wordpress, greengeeks, john doe, adding meta tags, meta, how to, seo, yoast,">
  */
} );

