# Purpose

This WordPress plugin should represent a proof of concept for a WordPress plugin declaring a [Gutenberg editor sidebar plugin](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) using a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/).

> If you don't have an idea what a Gutenberg editor sidebar plugin is, please head over to the [Gutenberg Handbook](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) and read the introduction.

_The plugin does not need to have any other purpose than acting as a show case for rendering a [Gutenberg editor sidebar plugin](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) using a JSON Schema definition._

> An example usage for this plugin could be a plugin that adds a sidebar to the Gutenberg editor for post type `page` rendering a form to edit SEO optimization data like keywords, description etc (https://www.greengeeks.com/tutorials/add-meta-tags-wordpress/).

It would be perfect if this package would provide a WordPress plugin

- declaring a [Gutenberg editor sidebar plugin](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) form using a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file

- implement the [Gutenberg editor sidebar plugin](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) rendering the [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file using [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

- adding the entered data to the html header of the post/page

- has a 'usage' section this this `README.md` file explaining how to showcase the plugin.

   - A embedded screenshot - or better a animated gif/png - would help a lot when representing our hackathon results.

# Development

## Tips

### Package `@wordpress/element` is deprecated

Package [@wordpress/element](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/) is deprecated since WordPress 6.4.0. It's recommended to use the `react` directly.

An example: Don't use `import { useState } from '@wordpress/element'` but `import { useState } from 'react'`.

see https://github.com/WordPress/gutenberg/pull/54908 for details.

### Discover [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)

[@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is the best buddy you can have for WordPress plugin/theme development. This package provides a configurable local WordPress environment managed using [docker](https://docker.io).

Since many of the sub packages of this project rely on [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) it's already installed and properly configured for you in the root package. See the root package scripts for more information.

### Stretch the limits of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

Consider using the [FormTokenField component](https://wordpress.github.io/gutenberg/?path=/docs/components-formtokenfield--docs) to collect keywords for SEO.

[react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) allows you to [define custom components for rendering the form fields](https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-widgets-fields). This is a perfect opportunity to use the [FormTokenField component](https://wordpress.github.io/gutenberg/?path=/docs/components-formtokenfield--docs) to collect keywords for SEO.

The collected SEO data could then spit into the page header using the `wp_head` action hook.

```
...
<meta name="key" content="value" />
<meta name="author" content="Your Name">
<meta name="robots" content="index, follow">
<meta name="keywords" content="keyword1, keyword2" />
<meta name="description" content="this is the description of this page" />
<meta name="facebook-domain-verification" content="abcdefghijklmnopqrstuvwxyz" />
...
```


### How to start

* Head over to the [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) and warm up with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/)

- Get familiar with [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) : this package will be your best friend when developing WordPress plugins containing JavaScript/CSS.

## Links

- [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

- [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.

- dive into [Gutenberg editor sidebar plugin](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) documentation

- Have a look to Gutenberg slotfill system to target the Inspector Panel of the Gutenberg Sidebar from within a custom block.

  - https://developer.wordpress.org/news/2022/11/18/how-to-extend-wordpress-via-the-slotfill-system/

  - https://developer.wordpress.org/news/2023/12/22/extending-plugins-using-custom-slotfills/

- Sidebar / PluginSidebar documentation :

  - https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-sidebar-more-menu-item/

  - https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-sidebar/

- [Add Controls to the Post Sidebar with PluginDocumentSettingPanel](https://wholesomecode.net/add-controls-to-the-post-sidebar-with-plugindocumentsettingpanel/)

  This tutorial shows exemplary how to add controls to the post sidebar using the WordPress Block Editor (Gutenberg) Components.
