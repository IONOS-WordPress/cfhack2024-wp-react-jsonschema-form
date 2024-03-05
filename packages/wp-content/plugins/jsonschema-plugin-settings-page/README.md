# Purpose

This sub project should represent a proof of concept for a WordPress plugin declaring its settings page using a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/).

_The plugin does not need to have any other purpose than acting as a show case for rendering a settings page using a JSON Schema definition of the plugin settings. A good idea would be to take the settings page of a popular plugin screen (maybe Matthias Pfefferle & Automattic [ActivityPub](https://wordpress.org/plugins/search/activitypub/)) and render it using [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)._

It would be perfect if this package would provide a WordPress plugin

- declaring the plugin settings as a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file

- implements the declaration of the plugin settings using the [WordPress Settings API](https://developer.wordpress.org/plugins/settings/using-settings-api/)

- registers a WordPress Admin page rendering the settings declared in the [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file using [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

- registers a WordPress Widget (or Admin page) showing the current plugin settings

- has a 'usage' section this this `README.md` file explaining how to showcase the plugin.

  - A embedded screenshot - or better a animated gif/png - would help a lot when representing our hackathon results.

## Bonus feature

- provide a settings page mirroring the settings page of a popular plugin (like [ActivityPub by Matthias Pfefferle](https://github.com/automattic/wordpress-activitypub)) using [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) to show case a _real world_ settings page.

  - this plugins settings page can also be uses to do a comparison (size/effort/ux) between the classic implementation of a settings page and our solution.

# Development

## Tips

### `@wordpress/element` is deprecated

Package [@wordpress/element](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/) is deprecated since WordPress 6.4.0. It's recommended to use the `react` directly.

An example: Don't use `import { render } from '@wordpress/element'` but `import React from 'react'`.

see https://github.com/WordPress/gutenberg/pull/54908 for details.

### Discover [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)

[@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is the best buddy you can have for WordPress plugin/theme development. This package provides a configurable local WordPress environment managed using [docker](https://docker.io).

Since many of the sub packages of this project rely on [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) it's already installed and properly configured for you in the root package. See the root package scripts for more information.

### How to start

* Head over to the [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) and warm up with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/)

- Get familiar with [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) : this package will be your best friend when developing WordPress plugins containing JavaScript/CSS.

- Peek into [Storybook](https://storybook.js.org/) : it might help you when prototyping with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/) - it features [Hot Module Replacement](https://dev.to/omar4ur/vite-hot-module-replacement-a-complete-example-pkg) right at your fingertips 🙌

## Links

- see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

- see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.

- [Create a Settings Page using WordPress Block Editor (Gutenberg) Components](https://wholesomecode.net/create-a-settings-page-using-wordpress-block-editor-gutenberg-components/)

  This tutorial shows exemplary how to create a settings page using the WordPress Block Editor (Gutenberg) Components. It's a good starting point to understand how to use the WordPress Block Editor (Gutenberg) Components to create a settings page.

  => We want to do something similar but using [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) instead of hard coding the form like the example in the tutorial.
