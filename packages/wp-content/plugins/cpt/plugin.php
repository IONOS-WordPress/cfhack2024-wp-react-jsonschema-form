<?php
/**
 * Plugin Name: cpt
 * Description: Create data models in wp-admin.
 * Requires at least: 6.4
 * Requires Plugins:  rjsf-renderer
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cpt
 */

 /**
 * Converts parsed block format into format used in block templates.
 *
 * Example:
 *
 *     // input
 *     [
 *         [ 'blockName' => 'core/paragraph'
 *         , 'attrs' => [ 'content' => '<b>Strong<i>em' ]
 *         , 'innerBlocks' => [ $blocks ]
 *         , 'innerHTML' => '…'
 *         , 'innerContent' => [ ... ]
 *     ]
 *
 *     // output
 *     [ [ 'core/paragraph', [ 'content' => '<b>strong<i>em' ], [ $blocks ] ]
 *
 * @param array $blocks Parsed blocks to convert.
 * @return array[]      Array of blocks in array format used in block templates.
 */
function convert_parsed_blocks_for_js( $blocks ) {
	$template = array();
	foreach ( $blocks as $block ) {
		if ( null === $block['blockName'] && empty( trim( $block['innerHTML'] ) ) ) {
			continue;
		}

		$entry = array( $block['blockName'], $block['attrs'] );
		if ( isset( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
			$entry[] = convert_parsed_blocks_for_js( $block['innerBlocks'] );
		}
		$template[] = $entry;
	}
	return $template;
}

add_action(
	'init',
	function () {
		register_post_type(
			'wp_data_type',
			array(
				'label'        => 'Data Type',
				'public'       => true,
				'show_in_menu' => true,
				'show_in_rest' => true,
			)
		);

		$data_types = new WP_Query( array( 'post_type' => 'wp_data_type' ) );

		while ( $data_types->have_posts() ) {
			$data_types->the_post();
			$data_type = get_post();

			register_post_type(
				strtolower( $data_type->post_title ),
				array(
					'label'         => $data_type->post_title,
					'public'        => true,
					'show_in_menu'  => true,
					'show_in_rest'  => true,
					'icon'          => 'dashicons-admin-site',
					'template'      => convert_parsed_blocks_for_js( parse_blocks( $data_type->post_content ) ),
					'template_lock' => 'all',
				)
			);
		}
	},
	0
);

function my_custom_gutenberg_scripts() {
	wp_enqueue_script(
		'my-custom-inspector-control',
		plugin_dir_url( __FILE__ ) . '/edit-script.js', // Adjust the path to where your JS file is located.
		array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' )
	);
}

add_action( 'enqueue_block_editor_assets', 'my_custom_gutenberg_scripts' );

function jsonForCPT( $post_id ) {
	$post     = get_post( $post_id );
	$template = get_template_for_post_type( $post->post_type );
	if ( null === $template ) {
		return 'null';
	}

	$post_json = blocks_to_json( parse_blocks( $post->post_content ) );
	return $post_json;

	return hydrate_blocks_with_structured_data( parse_blocks( $template->post_content ), $post_json );
}

function get_template_for_post_type( $post_type ) {
	$query = new WP_Query( array( 'post_type' => 'wp_data_type' ) );
	while ( $query->have_posts() ) {
		$query->the_post();
		$template = get_post();

		if ( $post_type === strtolower( $template->post_title ) ) {
			return $template;
		}
	}
}

/**
 * Recursively parses block markup and extracts metadata attributes.
 *
 * @param array $blocks Array of block objects.
 *
 * @return array Array of metadata attribute mappings.
 */
function blocks_to_json( $blocks ) {
	$json = array();

	foreach ( $blocks as $block ) {
		// Check if the block has metadata attribute
		if ( isset( $block['attrs']['metadata']['formFieldNames'] ) && is_array( $block['attrs']['metadata']['formFieldNames'] ) ) {
			$metadata = $block['attrs']['metadata']['formFieldNames'];
			foreach ( $metadata as $attributeName => $fieldName ) {
				if ( $attributeName !== 'metadata' && isset( $block['attrs'][ $attributeName ] ) ) {
					$json[ $fieldName ] = isset( $block['attrs'][ $attributeName ] ) ? $block['attrs'][ $attributeName ] : null;
				}
			}
		}

		// Recursively process nested blocks
		if ( ! empty( $block['innerBlocks'] ) ) {
			$nestedMappings = blocks_to_json( $block['innerBlocks'] );
			$json           = array_merge( $json, $nestedMappings );
		}
	}

	return $json;
}

$data_type_titles = array();
add_filter(
	'init',
	function () {
		global $data_type_titles;
		if ( empty( $data_type_titles ) ) {
			// Get a list of all posts with wp_data_type post type
			$data_types = new WP_Query( array( 'post_type' => 'wp_data_type' ) );
			// Get all their titles in lowercase
			$data_type_titles = array_map(
				function ( $post ) {
					return strtolower( $post->post_title );
				},
				$data_types->posts
			);
		}
	}
);

function hackathon_replace_attributes( $template_blocks, $post_json ) {
	foreach ( $template_blocks as &$template_block ) {
		if ( 'core/paragraph' === $template_block['blockName'] && isset( $template_block['attrs']['metadata']['formFieldNames']['content'] ) ) {
			$content_attribute = $template_block['attrs']['metadata']['formFieldNames']['content'];
			$content           = $post_json[ $content_attribute ];
			if ( empty( $content ) ) {
				continue;
			}

			$p = new WP_HTML_Tag_Processor( $template_block['innerHTML'] );
			$p->next_tag();
			$p2 = new WP_HTML_Tag_Processor( '<p>' );
			$p2->next_tag();
			foreach ( $p->get_attribute_names_with_prefix( '' ) ?? array() as $attribute ) {
				$p2->set_attribute( $attribute, $p->get_attribute( $attribute ) );
			}

			$new_content = $p2->get_updated_html() . $content . '</p>';

			$template_block['innerHTML']    = $new_content;
			$template_block['innerContent'] = array( $new_content );
		}

		if ( 'core/heading' === $template_block['blockName'] && isset( $template_block['attrs']['metadata']['formFieldNames']['content'] ) ) {
			$content_attribute = $template_block['attrs']['metadata']['formFieldNames']['content'];
			$content           = $post_json[ $content_attribute ];
			if ( empty( $content ) ) {
				continue;
			}

			$p = new WP_HTML_Tag_Processor( $template_block['innerHTML'] );
			$p->next_tag();
			$p2 = new WP_HTML_Tag_Processor( "<{$p->get_tag()}>" );
			$p2->next_tag();
			foreach ( $p->get_attribute_names_with_prefix( '' ) ?? array() as $attribute ) {
				$p2->set_attribute( $attribute, $p->get_attribute( $attribute ) );
			}

			$new_content = $p2->get_updated_html() . $content . "</{$p->get_tag()}>";

			$template_block['innerHTML']    = $new_content;
			$template_block['innerContent'] = array( $new_content );
		}

		if ( 'core/image' === $template_block['blockName'] && isset( $template_block['attrs']['metadata']['formFieldNames']['url'] ) ) {
			$url_attribute = $template_block['attrs']['metadata']['formFieldNames']['url'];
			$url           = $post_json[ $url_attribute ];
			if ( empty( $url ) ) {
				continue;
			}

			$p = new WP_HTML_Tag_Processor( $template_block['innerHTML'] );
			if ( $p->next_tag( 'IMG' ) ) {
				$p->set_attribute( 'src', $url );
			}

			$new_content                    = $p->get_updated_html();
			$template_block['innerHTML']    = $new_content;
			$template_block['innerContent'] = array( $new_content );

			$template_block['attrs']['url'] = $url;
		}

		if ( isset( $template_block['innerBlocks'] ) && is_array( $template_block['innerBlocks'] ) ) {
			$template_block['innerBlocks'] = hackathon_replace_attributes( $template_block['innerBlocks'], $post_json );
		}
	}

	return $template_blocks;
}

function replace_hackathon_post_content( $posts, $query ) {
	global $data_type_titles;
	foreach ( $posts as $post ) {
		if ( in_array( $post->post_type, $data_type_titles, true ) ) {
			$template = get_template_for_post_type( $post->post_type );

			$post_json          = blocks_to_json( parse_blocks( $post->post_content ) );
			$template_blocks    = hackathon_replace_attributes( parse_blocks( $template->post_content ), $post_json );
			$hydrated           = hydrate_blocks_with_structured_data( $template_blocks, $post_json );
			$post->post_content = implode( '', array_map( 'render_block', $hydrated ) );
		}
	}

	return $posts;
}

add_filter( 'the_posts', 'replace_hackathon_post_content', 10, 2 );

function hydrate_blocks_with_structured_data( $template_blocks, $data_from_instance ) {
	foreach ( $template_blocks as &$template_block ) {
		// Check if the block has metadata attribute.
		if ( isset( $template_block['attrs']['metadata']['formFieldNames'] ) && is_array( $template_block['attrs']['metadata']['formFieldNames'] ) ) {
			$template_mappings = $template_block['attrs']['metadata']['formFieldNames'];
			foreach ( $template_mappings as $attribute_to_replace => $data_name ) {
				if ( 'metadata' !== $attribute_to_replace && isset( $data_from_instance[ $data_name ] ) ) {
					$template_block['attrs'][ $attribute_to_replace ] = $data_from_instance[ $data_name ];
				}
			}
		}

		// Recursively process nested blocks.
		if ( ! empty( $template_block['innerBlocks'] ) ) {
			$template_block['innerBlocks'] = hydrate_blocks_with_structured_data( $template_block['innerBlocks'], $data_from_instance );
		}
	}

	return $template_blocks;
}
