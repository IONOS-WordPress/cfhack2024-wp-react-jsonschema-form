<?php
/**
 * Plugin Name:       gutenberg-block-attributes-jsonschema
 * Description:       provides a WordPress plugin declaring WordPress block rendering its attributes form using react-jsonschema-form into the inspector panel of Gutenberg
 * Requires at least: 6.4
 * Requires Plugins:  react-jsonschema-form-renderer
 * Requires PHP:      8.3
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-block-attributes-jsonschema
 */

namespace cfhack2024_wp_react_jsonschema_form\gutenberg_block_attributes_jsonschema;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

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
