<?php
/**
 * Plugin Name:       gutenberg-form-block-jsonschema
 * Description:       declaring a Gutenberg block rendering a form using react-jsonschema-form in posts/pages
 * Requires at least: 6.3
 * Requires PHP:      8.3
 * Version:           1.0.0
 * Author:            The Hackathon Project Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-form-block-jsonschema
 */

namespace cfhack2024_wp_react_jsonschema_form\gutenberg_form_block_jsonschema;

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
