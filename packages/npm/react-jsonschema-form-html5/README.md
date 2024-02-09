# Purpose

This package implements a custom [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) renderer outputting pure HTML5.

This renderer should be used for example use cases where the JSON Schema gets be rendered in published pages. 

_Because it's probably very simple source code it could even be used as template for the [react-jsonschema-form-gutenberg renderer](../react-jsonschema-form-gutenberg/)._

It would be perfect if this package would: 

- export the renderer via `index.mjs`

  Have a look at other renderers and how they do it : https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages

- provides a PHP file to register the renderer in WordPress using WordPress function [wp_register_script()](https://developer.wordpress.org/reference/functions/wp_register_script/)

- has a 'usage' section this this `README.md` file explaining how to use your renderer

# Development

## Tips

### Don't use React directly

If you are in the need to use React functions/hooks : **Do not import and use React directly !** 

Package [@wordpress/element](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/) is a lightweight wrapper around React providing exactly the same functions as React. 

An example: Use `import { createElement } from '@wordpress/element'` instead of `import React from 'react'`. 

### If I would be you ...

I would start creating a [Storybook](https://storybook.js.org/) story for each of the features you want to implement peu a peu.

Kinda _SDD_ - Storybook Driven Development 😅

Using Storybook you can easily develop and test your components in isolation. Have the story opened in the browser and every ime you save the file it gets updated within storybook.

### How to start

I would simply *copy* the simplest available renderer into this package and start transforming it to the desired output.

## Links

  - see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

  - see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.