<?php
/**
 * Plugin Name:       site-builder-demo
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

namespace cfhack2024_wp_react_jsonschema_form\site_builder_demo;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers a new Team Member post type.
 */
\add_action(
  'init',
  function() {
    \register_post_type( 'team-member', [
      'label'  => 'Team Member',
      'public' => true,
      'show_in_rest' => true,
      'supports' => [ 'title', 'editor' ],
      'schema'    => json_decode( file_get_contents( __DIR__ . '/team-member.json' ), true ),
      'ui_schema' => json_decode( file_get_contents( __DIR__ . '/team-member-ui.json' ), true ),
      'show_schema_form' => true,
      'template_lock' => 'all',
  ] );
}
);

add_action(
  'registered_post_type',
  function( $post_type, $post_type_object ) {
    if ( ! empty( $post_type_object->schema ) ) {
      foreach ( $post_type_object->schema['properties'] as $key => $property ) {
        \register_post_meta( $post_type, $key, [
          'show_in_rest' => true,
          'single' => true,
          'type' => $property['type'],
        ] );
      }
    }
  },
  10,
  2
);

add_filter(
  'register_post_type_args',
  function( $args, $post_type ) {
    if ( ! empty( $args['show_schema_form'] ) ) {
      $args['template'] = [
        [
          'cfhack2024-wp-react-jsonschema-form/schema-block',
          [
            'schema' => ! empty( $args['schema'] ) ? $args['schema'] : [],
            'ui_schema' => ! empty( $args['ui_schema'] ) ? $args['ui_schema'] : [],
          ],
        ]
      ];
    }
    return $args;
  },
  10,
  2
);


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
\add_action( 'init', fn() => \register_block_type( __DIR__ . '/build' ));

add_action(
  'load-post-new.php',
  function() {
    wp_enqueue_script( 'rjsf-gutenberg-renderer' );
  }
);

add_action(
  'load-post.php',
  function() {
    wp_enqueue_script( 'rjsf-gutenberg-renderer' );
  }
);

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

