<?php
/**
 * Plugin Name:       metabox-block
 * Description:       WordPress plugin contributing meta boxes the inspector panel of Gutenberg
 * Requires at least: 6.4
 * Requires Plugins:  rjsf-renderer
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       metabox-block
 */

namespace cfhack2024_wp_react_jsonschema_form\gutenberg_metabox_jsonschema;

defined( 'ABSPATH' ) || exit;

/**
 * Registers the custom_post_meta field.
 */
\add_action( 'init', fn() => \register_post_meta(
  'page',
  'metabox-block-data',
  [
    'single'       => true,
    'type'         => 'string',
    'default'      => '{ "foo" : "bar" }',
    'show_in_rest' => array(
        'schema' => array(
            'type'  => 'string',
        ),
    ),
  ]
));

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
\add_action( 'init', fn() => \register_block_type( __DIR__ . '/build' ));

/**
 * Registers or own block category as the first category
 */
\add_filter( 'block_categories_all' , function( $categories ) {
  // ensure category gets not added twice
  if(array_search('cfhack2024-wp-react-jsonschema-form',array_column($categories,'slug')) === false) {
    array_unshift(
      $categories, [
        'slug'  => 'cfhack2024-wp-react-jsonschema-form',
        'title' => 'cfhack'
      ]
    );
  }

  return $categories;
});

/**
 * Add custom Meta Tags to header.
 */
\add_action( 'wp_head', function () {
  $post_id = \get_the_ID();

  $value = get_post_meta( get_the_ID(), 'metabox-block-data', true );

  if( ! \get_post_meta( $post_id, 'metabox-block-data', true ) ) {
    return;
  }
  if( ! \get_post_meta( $post_id, 'metabox-block-data', false ) ) {
    return;
  }
  // both ifs will get run if no meta field is found; since
  // array() == false and '' == false

  // @TODO evaluate post meta metabox-block-data JSON data and echo the matching <meta> tags
  $data = \get_post_meta( $post_id, 'metabox-block-data', true );
  echo "<!-- metabox-block-data $data -->";

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

