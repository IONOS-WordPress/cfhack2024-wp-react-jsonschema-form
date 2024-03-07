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

## Sub Package Layout

Each of the directories in `src/` is resulting in a separate JavaScript bundle [registered by the plugin](https://developer.wordpress.org/reference/functions/wp_register_script/) (see PHP function `__registerRjsfUtils` in this plugin) to be used as script dependency by other plugins.

- `./src/rjsf-utils`

  Exposes [`@rjsf/utils`](https://www.npmjs.com/package/@rjsf/utils) package by registering the script in WordPress using handle `"rjsf-utils"`.

  [`@rjsf/core`](https://www.npmjs.com/package/@rjsf/core) contains a huge bunch of utility functions used by renderers including the  [`@rjsf/core`](https://www.npmjs.com/package/@rjsf/core) and is required as script dependency if you want to render.

  It is mapped to global variable `window.rjsf.utils` in the browser.

- `./src/rjsf-validator-ajv8`

  Exposes the [`@rjsf/validator-ajv8`](https://www.npmjs.com/package/@rjsf/validator-ajv8) package by registering the script in WordPress using handle `"rjsf-validator"`. Registration is done in PHP function `__registerRjsfValidator` of this plugin.

  [`@rjsf/validator-ajv8`](https://www.npmjs.com/package/@rjsf/validator-ajv8) is a package providing the AJV-8 based validator for [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

  This bundle enables validation of form input rendered by [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form). It is required as script dependency if you want to render forms.

  It is mapped to global variable `window.rjsf['validator-ajv8']` in the browser.

- `./src/rjsf-core`

  This bundle exposes the [`@rjsf/core`](https://www.npmjs.com/package/@rjsf/core) package by registering the script in WordPress using handle `"rjsf-core"`. Registration is done in PHP function `__registerRjsfCore` of this plugin.

  [`@rjsf/core`](https://www.npmjs.com/package/@rjsf/core) is the core package of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) and is required as script dependency if you want to render.

  It is mapped to global variable `window.rjsf.core` in the browser.

  _This bundle ist already registered to have dependencies to `"rjsf-utils"`._

- `./src/rjsf-renderer-gutenberg`

  This bundle exposes our Gutenberg renderer implementing rendering [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) forms utilizing the Gutenberg ui components provided by [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/).

  _Right know this package provides a stripped down (but fully functional) duplicate of the [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) renderer implemented using Bootstrap 3. This renderer is a perfect boilerplate renderer because of it's simplicity._

  **Refactoring this renderer to use only [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/) is one of the main tasks for the Hackathon.**

- `./src/rjsf-renderer-html5`

  This bundle exposes a Renderer resulting in rendering pure HTML5 [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) forms utilizing nothing else then native browser html elements.

  _Right know this package provides a stripped down (but fully functional) duplicate of the [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) renderer implemented using Bootstrap 3. This renderer is a perfect boilerplate renderer because of it's simplicity._

  **Refactoring this renderer to use only HTML5 is one of the (optional) tasks for the Hackathon.**

_The bundle created by `./src/settings-page` is ony used for the settings page playground of this plugin showcasing the usage of the other [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) bundles provided by this plugin._

Have a look at this settings page code JS/CSS and PHP Code (see WordPress admin page registration of this plugin) to get a clue how to integrate [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) form rendering into any other plugin/theme of this project.

_It demonstrates how to integrate [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) in a WordPress plugin settings page using the JS/CSS bundles exposed by this plugin._

## How do I start ?

If you want to start working on a renderer you should start by looking at the `./src/rjsf-renderer-gutenberg` or `./src/rjsf-renderer-html5` directories.

- Read the [Advanced Customization chapter of react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/)

- Introduce yourself to the source code within the React components in the desired `src/[renderer]/components` directory.

- Start hacking:

  1. Follow the steps in the root `README.md` to start up the development environment.

  1. Open the browser and go to the plugin settings playground page of this plugin.

  1. Open up one of the React components in your editor and change something.

  1. Rebuild sources using `pnpm run build` and refresh the browser to see the changes.

      _You can even start `pnpm run dev` instead of `pnpm run build` to get your JS/CSS changes instantly transpiled when saving files._

  1. Repeat step 2-4 until you are happy with the result.

  _Don't forget that you even may need to modify CSS files of the renderer to get the desired results._

## Tips

### If you don't see your changes reflected in the plugins settings page playground in the browser

Check that the rendered JSON Schema file contains elements resulting in rendering the React component you are working on.

If not, just modify the `settings-page-jsonschema.json` (and/or `settings-page-jsonschema-ui.json`) file to include the elements you want to render.

_You can even use your own schema files or pick one in the [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/). Just drop it to the plugin directory and adjust their exposition to the frontend (see WordPress 'load-*' action registration using PHP function `wp_add_inline_script`)._

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

- see - Read the [Advanced Customization chapter of react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/) to know what React components need to be changed to implement what in a custom renderer.
