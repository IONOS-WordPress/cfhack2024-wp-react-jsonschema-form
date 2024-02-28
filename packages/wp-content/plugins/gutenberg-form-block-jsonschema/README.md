# Purpose

This WordPress plugin should represent a proof of concept for a WordPress Form Block rendering a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) form into a page/post.

The proof should demo editing a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) in the edit view of the Gutenberg editor and rendering the form in the frontend.

It would be perfect if this package would provide a WordPress plugin

- declaring a [Gutenberg block](https://developer.wordpress.org/block-editor/getting-started/fundamentals/)

- implement the [Gutenberg block](https://developer.wordpress.org/block-editor/getting-started/fundamentals/)

  - use [Monaco editor framework(https://stackoverflow.com/a/76113109) to implement a full featured JSON Schema editor in the block edit view

  - render the edited [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) form using [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) in the frontend

  - form block should support some simple "target" options (e.g. send form data to a specific endpoint (contributed by this plugin) or as email). Or as its simplest solution : create a `mailto:` link with the form data as query parameters.

- has a 'usage' section this this `README.md` file explaining how to showcase the plugin.

  - A embedded screenshot - or better a animated gif/png - would help a lot when representing our hackathon results.

## Bonus feature

- use a different [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) renderer for the frontend (ideally our own HTML5 renderer if we get it ready in time)

- try to use our HTML5 [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) renderer without injecting React into the published pages

  - because The HTML5 renderer is intended to target published pages it would be a ideal choice the share the same runtime as the [WordPress Interactivity API](https://make.wordpress.org/core/2023/03/30/proposal-the-interactivity-api-a-better-developer-experience-in-building-interactive-blocks/) which is also targeting published pages.

    - [WordPress Interactivity API](https://make.wordpress.org/core/2023/03/30/proposal-the-interactivity-api-a-better-developer-experience-in-building-interactive-blocks/) is using [Preact](https://preactjs.com/) combined with [Preact Signals](https://github.com/preactjs/signals) as building blocks.

    Fortunately [Preact](https://preactjs.com/) is actually kinda _lightweight React_ (including [JSX](https://en.wikipedia.org/wiki/JSX_(JavaScript))) so it should be possible to implements our HTML5 renderer without making published pages too heavy.


# Development

## Tips

### `@wordpress/element` is deprecated

Package [@wordpress/element](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/) is deprecated since WordPress 6.4.0. It's recommended to use the `react` directly.

An example: Don't use `import { render } from '@wordpress/element'` but `import React from 'react'`.

### Discover [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)

[@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is the best buddy you can have for WordPress plugin/theme development. This package provides a configurable local WordPress environment managed using [docker](https://docker.io).

Since many of the sub packages of this project rely on [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) it's already installed and properly configured for you in the root package. See the root package scripts for more information.

### How to start

* Head over to the [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) and warm up with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/)

- Get familiar with [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) : this package will be your best friend when developing WordPress plugins containing JavaScript/CSS.

## Links

- [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

- [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.

- Read about [Gutenberg block development](https://developer.wordpress.org/block-editor/getting-started/fundamentals/)

- [Add a Sidebar to your Custom WordPress Block with InspectorControls](https://wholesomecode.net/add-sidebar-to-your-custom-wordpress-block-with-inspectorcontrols/)

  This tutorial explains how to add custom panel to the Gutenberg Sidebar using the `InspectorControls` component. It's a good starting point to understand how to use the WordPress Block Editor (Gutenberg) Components to create a settings page.
