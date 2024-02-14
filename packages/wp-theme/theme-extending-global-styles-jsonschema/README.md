# Purpose

This sub project should represent a proof of concept for a WordPress theme declaring additional custom settings to the global styles editor using a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/).

_The theme does not need to have any other purpose than acting as a show case for rendering a additional custom settings using a JSON Schema definition to the global styles editor of WordPress._  

It would be perfect if this package would provide a WordPress theme 

- a [child theme](https://developer.wordpress.org/themes/advanced-topics/child-themes/) of the latest official WordPress [Twenty Twenty-Four](https://wordpress.org/documentation/article/twenty-twenty-four/) theme

- defining additional custom settings as a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file

- implements injection of the [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) renderer into the global styles editor of WordPress

- persist changes as [WordPress options](https://developer.wordpress.org/apis/options/)

- reflect the additional custom settings of the child theme in pages/posts

- has a 'usage' section this this `README.md` file explaining how to showcase the plugin. 

  - A embedded screenshot - or better a animated gif/png - would help a lot when representing our hackathon results. 

# Development

## Tips

### Don't use React directly

If you are in the need to use React functions/hooks : **Do not import and use React directly !** 

Package [@wordpress/element](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/) is a lightweight wrapper around React providing exactly the same functions as React. 

An example: Don't use `import React from 'react'` but use `import { render } from '@wordpress/element'` instead. 

### Discover [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)

[@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is the best buddy you can have for WordPress plugin/theme development. This package provides a configurable local WordPress environment managed using [docker](https://docker.io).

Since many of the sub packages of this project rely on [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) it's already installed and properly configured for you in the root package. See the root package scripts for more information.

### How to start

* Head over to the [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) and warm up with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/) 

- Get familiar with [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) : this package will be your best friend when developing WordPress plugins containing JavaScript/CSS. 

## Links

- see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

- see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.


- Checkout child themes in the [WordPress Theme Handbook](https://developer.wordpress.org/themes/advanced-topics/child-themes/)

- global styles are subject of heavy caching - have a look at [Configuring development mode in WordPress 6.3](https://make.wordpress.org/core/2023/07/14/configuring-development-mode-in-6-3/) to know about side effects.