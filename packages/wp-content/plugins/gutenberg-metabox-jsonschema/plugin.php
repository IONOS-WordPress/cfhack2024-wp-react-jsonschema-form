<?php
/**
 * Plugin Name:       gutenberg-metabox-jsonschema
 * Description:       WordPress plugin contributing meta boxes the inspector panel of Gutenberg
 * Requires at least: 6.3
 * Requires PHP:      8.3
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-metabox-jsonschema
 */

namespace cfhack2024_wp_react_jsonschema_form\gutenberg_metabox_jsonschema;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the custom_post_meta field.
 */
\add_action( 'init', fn() => \register_post_meta(
  'page',
  'our_metabox_data',
  [
      'type'         => 'string',
      'show_in_rest' => true,
      'single'       => true,
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

  $value = get_post_meta( get_the_ID(), 'our_metabox_data', true );

  if( ! \get_post_meta( $post_id, 'our_metabox_data', true ) ) {
    return;
  }
  if( ! \get_post_meta( $post_id, 'our_metabox_data', false ) ) {
    return;
  }
  // both ifs will get run if no meta field is found; since
  // array() == false and '' == false

  // @TODO evaluate post meta our_metabox_data JSON data and echo the matching <meta> tags
  // $our_metabox_data = \get_post_meta( $post_id, 'our_metabox_data', true );
  // echo "<!-- $our_metabox_data -->";

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

