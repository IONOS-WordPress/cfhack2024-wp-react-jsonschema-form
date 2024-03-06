# Purpose

This plugin acts as a foundation for all other plugins/theme providing

- [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

- the [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) Gutenberg renderer implementation

- the [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) Html5 renderer implementation

So if you think you should implement the Gutenberg renderer or Html5 renderer for the Hackaton - this plugin is your place to be.

_The plugin does not need to have any other purpose than providing [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) and our renderers to all other plugins/theme. It contains a simple plugin settings page rendering a form using [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) our renderer just for testing purposes_

It would be perfect if this package would provides

- a Gutenberg renderer _at least_ capable of rendering the forms of all other plugins/theme nicely utilizing the Gutenberg ui components provided by [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/)

  - ideally the renderer would completely implemented using [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/) and not spitting out Bootstrap 3 code.

- has a 'usage' section this this `README.md` file explaining how to showcase the plugin.

  - A embedded screenshot - or better a animated gif/png - would help a lot when representing our hackathon results.

## Bonus feature

- (optional) a Html5 renderer resulting of pure modern Html5 forms. _At least_ capable of rendering the forms of all other plugins/theme nicely utilizing the Html5 controls of modern browsers

  - ideally the renderer would completely implemented using plain modern Html5 and not spitting out Bootstrap 3 code.

# Development

## Tips

### `@wordpress/element` is deprecated

Package [@wordpress/element](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/) is deprecated since WordPress 6.4.0. It's recommended to use the `react` directly.

An example: Don't use `import { useState } from '@wordpress/element'` but `import { useState } from 'react'`.

see https://github.com/WordPress/gutenberg/pull/54908 for details.

### Discover [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)

[@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is the best buddy you can have for WordPress plugin/theme development. This package provides a configurable local WordPress environment managed using [docker](https://docker.io).

Since many of the sub packages of this project rely on [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) it's already installed and properly configured for you in the root package. See the root package scripts for more information.

### How to start

@TODO: continue here

- Head over to the [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) and warm up with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/)

- Peek into [Storybook](https://storybook.js.org/) : it might help you when prototyping with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/) - it features [Hot Module Replacement](https://dev.to/omar4ur/vite-hot-module-replacement-a-complete-example-pkg) right at your fingertips 🙌

## Links

- see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

- see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.

