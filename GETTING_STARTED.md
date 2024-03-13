This document should help you to get started with any of the use case sub projects (aka everything except `packages/wp-content/plugins/rjsf-renderer`).

The guide assumes that you already have checkout and installed the project. If not, please follow the instructions in the `README.md`.

# What is probably the easiest use case to start hacking ?

The easiest use case to start hacking is the `packages/wp-content/plugins/settings-page` plugin. It's a simple plugin that provides a settings page currently just rendering just a simple textarea to edit a JSON. Try to replace it with a rendered form using the by adopting the steps below.

# Bootstrapping jsrf rendering

Most uses cases already provide a (boilerplate) textarea for editing JSON data rendered with just React right know, but we want to use the [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) to render the form.

Thats why we need to inject our [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) renderer Javascript and CSS into wordpress (aka the editor/settings page/etc).

This is done using the `wp_enqueue_script` and `wp_enqueue_style` functions of WordPress in the desired usecase plugin/theme.

_This step is usually done in a [WordPress hook](https://developer.wordpress.org/plugins/hooks/) callback._

```php
...
/*
  register your js file to be loaded
*/
$asset_file = include( \plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
\wp_enqueue_script(
  'my-custom-script',
  \plugins_url( 'build/index.js', __FILE__ ),
  /*
    IMPORTANT : the script depends on both generated dependencies in index.php
    AND our used renderer dependencies (at least one of 'rjsf-gutenberg-renderer' or 'rjsf-html5-renderer')
  */
  array_merge( $asset_file['dependencies'], ['rjsf-gutenberg-renderer']),
  $asset_file['version'],
  true,
);

/*
  register your css file to be loaded
*/
\wp_enqueue_style(
  'my-custom-style',
  \plugins_url('build/index.css', __FILE__),
  /*
    IMPORTANT : the style depends on our used renderer dependencies (at least one of 'rjsf-gutenberg-renderer' or 'rjsf-html5-renderer')
  */
['wp-components', 'rjsf-gutenberg-renderer'], // in case of the htl renderer use only ['rjsf-html5-renderer'] instead
  $asset_file['version']
);

...
```

As you can see, there is nothing special except that you need to inject the `rjsf-gutenberg-renderer` or `rjsf-html5-renderer` handle manually as a dependency to your script and style (_`wp-scripts` cannot automatically handle non system dependencies, that's why we need need to add them manually_).

The code above is partly present in some sub projects (see `packages/wp-content/plugins/rjsf-renderer-playground` for example). Or just lookup the sources for references to `wp_enqueue_script` calls.

# Loading the schema files

Now that we have ensured that our renderer is enqueued, we need to provide a JSON Schema and Schema UI file.

This is usually done at the same place as the `wp_enqueue_script` and `wp_enqueue_style` calls:

```php
...
\wp_add_inline_script(
  'my-custom-script',
  "window['my-custom-script']=" . json_encode([
    /*
      provide the json schema file defining the structure of the form to the frontend
    */
    'jsonschema' => json_decode( file_get_contents(__DIR__ . '/custom-jsonschema.json')),
    /*
      provide the json schema ui file defining the individual form rendering customization to the frontend
    */
    'jsonschema-ui' => json_decode( file_get_contents(__DIR__ . '/custom-jsonschema-ui.json'))
  ]),
  'before',
);
...
```

This call will add a global variable `window['my-custom-script']` to the frontend containing the JSON Schema and Schema UI. The `'before'` parameter tells WordPress to add the inline script **before** the main script with handle 'my-custom-script' so that we can access it directly in our Javascript code without worrying if it's already loaded.

_The JSON Schema and Schema UI_ can even be provided as JSON objects in the Javascript sources, but it is recommended to load them from a file to make it easier to maintain and to provide a way to change the schema without changing the code._

# Render the form

Now that we have the JSON Schema and Schema UI available in the frontend, and the required libraries enqueued by WordPress, we can use our renderer to render the form.

At first we `import` the renderer into our Javascript file :

```js
// import the JSON Schema validator
import validator from '@rjsf/validator-ajv8';

// import our Gutenberg JSON Schema form renderer
import Form from '@cfhack2024-wp-react-jsonschema-form/rjsf-renderer/gutenberg';

/*
  or if you want to use our HTML5 renderer instead :
  import Form from '@cfhack2024-wp-react-jsonschema-form/rjsf-renderer/html5';
*/
```

Now we can use the `Form` component to finally render the form :


```js
// get the JSON Schema and Schema UI from the global variable we added in the second step
const schema = window['my-custom-script']['jsonschema'];
const uiSchema = window['my-custom-script']['jsonschema-ui'];

...
// render the form
<Form schema={schema} uiSchema={uiSchema} validator={validator} />
```

It's even possible to use inline JSON Schema and Schema UI objects instead of loading them from a file :

```js
// get the JSON Schema and Schema UI from the global variable we added in the second step
const schema = {
  "type": "object",
  "required": [
    "firstName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name",
      "default": "Chuck"
    }
  }
};
const uiSchema = {
  "firstName": {
    "ui:autofocus": true,
    "ui:enableMarkdownInDescription": true,
    "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/)."
  }
};

...
// render the form
<Form schema={schema} uiSchema={uiSchema} validator={validator} />
```

_Have a look at `<TextareaControl` occurrences at the provided boilerplate plugins to start hacking. That's a good location to insert rendered forms in the use case boilderplates._

# Development workflow

It's actually dead simple :

1. Ensure you already started the development environment with `pnpm start`.

1. Change source code in the use case sub project.

  - In case you've changes JS / CSS source files you need to rebuild the project with `pnpm run build`.

1. reload the WordPress page you are working on in the browser.

That's it !

# links to the next steps

- Take a look at the [react-jsonschema-form documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/)

- Don't miss the [react-jsonschema-form Quickstart](https://rjsf-team.github.io/react-jsonschema-form/docs/quickstart)
