# Purpose

This package implements a custom [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) renderer outputting pure HTML5.

This renderer should be used for example use cases where the JSON Schema gets be rendered in published pages. 

_Because it's probably very simple source code it could even be used as template for the [react-jsonschema-form-gutenberg renderer](../react-jsonschema-form-gutenberg/)._

It would be perfect if this package would: 

- export the renderer via `index.mjs`

  Have a look at other renderers and how they do it : https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages

- provides a PHP file to register the renderer in WordPress using WordPress function [wp_register_script()](https://developer.wordpress.org/reference/functions/wp_register_script/)

- has a 'usage' section this this `README.md` file explaining how to use your renderer

## Future directions

- because The HTML5 renderer is intended to target published pages it would be a ideal choice the share the same runtime as the [WordPress Interactivity API](https://make.wordpress.org/core/2023/03/30/proposal-the-interactivity-api-a-better-developer-experience-in-building-interactive-blocks/) which is also targeting published pages.

  - [WordPress Interactivity API](https://make.wordpress.org/core/2023/03/30/proposal-the-interactivity-api-a-better-developer-experience-in-building-interactive-blocks/) is using [Preact](https://preactjs.com/) combined with [Preact Signals](https://github.com/preactjs/signals) as building blocks.

  Fortunately [Preact](https://preactjs.com/) is actually kinda _lightweight React_ (including [JSX](https://en.wikipedia.org/wiki/JSX_(JavaScript))) so it should be possible to implements our HTML5 renderer without making published pages too heavy.

# Development

## Tips

Remember that the HTML5 renderer output will usually targeting published pages.   

- keep the output _simple_ and _tiny_ HTML5

  - should ideally look well on mobile devices 

- should be standards based - don't use quirky HTML hacks

- think twice before adding a custom CSS rule - the CSS for the HTML5 renderer output should work well with as many themes as possible

  - I would suggest to use the latest official WordPress theme to test with

### If I would be you ...

I would start creating a [Storybook](https://storybook.js.org/) story for each of the features you want to implement.

Kinda **SDD** - **S**tory **D**riven **D**evelopment 💡 !

Using Storybook you can easily develop and test your components in isolation. Have the story opened in the browser and every ime you save the file it gets updated within storybook.

### How to start

I would simply *copy* the cheapest available renderer into this package and start transforming it little by little using plain HTML5.

## Links

  - see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

  - see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.