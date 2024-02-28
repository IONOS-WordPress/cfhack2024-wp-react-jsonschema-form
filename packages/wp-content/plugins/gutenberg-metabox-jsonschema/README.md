# Purpose

This sub project should represent a proof of concept for a WordPress plugin implementing a custom meta box collecting some page/post related date in the Gutenberg editor ans use WordPress post meta data for persisting it.

> [What is a Meta Box?](https://developer.wordpress.org/plugins/metadata/custom-meta-boxes/#what-is-a-meta-box)
>
> When a user edits a post, the edit screen is composed of several default boxes: Editor, Publish, Categories, Tags, etc. These boxes are meta boxes. Plugins can add custom meta boxes to an edit screen of any post type.

> The **post meta data** is the "administrative" information you provide to viewers about each [post](https://codex.wordpress.org/Glossary#Post "Glossary"). This information usually includes the author of the post, when it was written (or posted), and how the author [categorized](https://codex.wordpress.org/Glossary#Category "Glossary") that particular post.

_The plugin does not need to have any other purpose than acting as a show case for rendering a Meta box using a JSON Schema definition into Gutenberg editor._

> An example usage for this plugin could be a plugin that adds a sidebar to the Gutenberg editor for post type `page` (and/or `post`) rendering a form to edit SEO optimization data like keywords, description etc (https://www.greengeeks.com/tutorials/add-meta-tags-wordpress/).

It would be perfect if this package would provide a WordPress plugin

- declaring a [Gutenberg editor sidebar plugin](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) form using a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file

- implement a [meta box](https://wholesomecode.net/create-custom-meta-boxes-using-the-wordpress-block-editor-gutenberg/) rendering the [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file using [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

- adding the entered data to the html header of the post/page

- has a 'usage' section this this `README.md` file explaining how to showcase the plugin. A embedded screenshot - or better a animated gif/png - would help a lot when representing our hackathon results.

- (Bonus) if you have time left, you could also try to inject the editor into the custom fields section of the Gutenberg editor 🤩.

  - __You need to enable the custom fields in the Gutenberg editor preferences in General/Advanced before you can use it.__

    - **Caveat** : If you enable the custom fields in the Gutenberg editor preferences the gutenberg-metabox-jsonschema block will not save anymore since the custom fields mechanism is later in the save process than the block mechanism.

# Development

## Tips

### `@wordpress/element` is deprecated

Package [@wordpress/element](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/) is deprecated since WordPress 6.4.0. It's recommended to use the `react` directly.

An example: Don't use `import { render } from '@wordpress/element'` but `import React from 'react'`.

see https://github.com/WordPress/gutenberg/pull/54908 for details.

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

### Discover [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)

[@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is the best buddy you can have for WordPress plugin/theme development. This package provides a configurable local WordPress environment managed using [docker](https://docker.io).

Since many of the sub packages of this project rely on [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) it's already installed and properly configured for you in the root package. See the root package scripts for more information.

### How to start

* Head over to the [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) and warm up with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/)

- Get familiar with [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) : this package will be your best friend when developing WordPress plugins containing JavaScript/CSS.

## Links

- [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

- [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.

- [Gutenberg Metabox Handbook](https://developer.wordpress.org/block-editor/how-to-guides/metabox/)

- [Example use case of meta boxes](https://wholesomecode.net/create-custom-meta-boxes-using-the-wordpress-block-editor-gutenberg/)

- [How to Add Post Meta Fields to Gutenberg Document Sidebar](https://awhitepixel.com/how-to-add-post-meta-fields-to-gutenberg-document-sidebar/)
