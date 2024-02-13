# Purpose

This WordPress plugin provides a proof of concept Gutenberg block declaring its block attributes using a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/).

The attributes should be rendered into the Inspector Panel of the Gutenberg Sidebar using [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file using [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

_The Gutenberg Block  does not need to have any other purpose than acting as a show case for rendering block attributes using a JSON Schema definition._  

It would be perfect if this package would provide a WordPress plugin

- declaring a custom Gutenberg block 

- The block attributes should declare a single property of type `object`. 

  The object will be used as a wrapper for our block attributes defined in a separate [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file

- the block attributes should be rendered into the Inspector Panel of the Gutenberg Sidebar using [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file using [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/)

- has a 'usage' section this this `README.md` file explaining how to showcase the plugin

## Bonus feature

Provide a proof of concept block wrapper abstracting the whole block definition using [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/). 

Using this wrapper should enable developers to declare a Gutenberg block by just providing a `render()` function and a [JSON Schema](https://rjsf-team.github.io/react-jsonschema-form/) file for the block attributes. No more `edit()` and `save()` functions needed.

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

* Dive into the [Gutenberg Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/) to get a clue about Gutenberg Block development. 

- Checkout [@wordpress/create-block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) : the ultimate tool to scaffold a new Gutenberg Block. Once yo used it you'never miss it.

* Head over to the [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) and warm up with [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/) 

## Links

- see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

- see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.