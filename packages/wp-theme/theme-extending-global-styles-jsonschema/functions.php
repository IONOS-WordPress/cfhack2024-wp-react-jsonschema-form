<?php

namespace cfhack2024_wp_react_jsonschema_form\theme_extending_global_styles_jsonschema;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

\add_action( 'wp_enqueue_scripts', fn() => \wp_enqueue_style(
  'theme-extending-global-styles-jsonschema',
  \get_stylesheet_uri()
));

/*
wp_enqueue_script(
        'custom-script',
        get_stylesheet_directory_uri() . '/js/custom_script.js',
        array( 'jquery' )
    );
*/
