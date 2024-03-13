This guide will help you to get started hacking with the `rjsf-renderer` project.

It will concentrate on the Gutenberg renderer, **but the same principles apply to the HTML5 renderer**.

The magic behind rendering a JSON Schema into a form is actually quite simple ... **but first you need to know how it works**.

Thats why i strongly recommend to read the [documentation of the `react-jsonschema-form` project](https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/) first.

# Ho to start

As you hopefully remembered, the renderers are right know just duplicates the Bootstrap 3 renderer from the `react-jsonschema-form` project. These are very simple and easy to understand. Thus, perfect to use them as base to create our own renderer using [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/).

To keep it simple we will start with re-implementing the Checkbox renderer `packages/wp-content/plugins/rjsf-renderer/src/rjsf-renderer-gutenberg/components/widgets/CheckboxWidget.jsx`.
This component is just simple enough to get a good understanding of the basic principles of the `react-jsonschema-form` project and the `@wordpress/components` package.

So open the `CheckboxWidget.jsx` file and get yourself a minute to see what happens at this component.

Let's start hacking:

- we need to import the components we want to use from `@wordpress/components` :

  ```js
  import { CheckboxControl, FormToggle } from '@wordpress/components';
  ```

- we need to replace the rendered `<input type=checkbox>` component with the `CheckboxControl` component from [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/).

  ```js
  // original code

  // return (<div className={`checkbox ${disabled || readonly ? 'disabled' : ''}`}>
  //   {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry}/>)}
  //   <label>
  //     <input type='checkbox' id={id} name={id} checked={typeof value === 'undefined' ? false : value} required={required} disabled={disabled || readonly} autoFocus={autofocus} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} aria-describedby={ariaDescribedByIds(id)}/>
  //     {labelValue(<span>{label}</span>, hideLabel)}
  //   </label>
  // </div>);

  // our code
  return (
    <>
      {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry}/>)}
      <CheckboxControl
        checked={typeof value === 'undefined' ? false : value}
        label={labelValue(<span>{label}</span>, hideLabel)}
        onChange={onChange}
      ></CheckboxControl>
    </>
  );
  ```

- rebuild it : `pnpm run build`

- go to the WordPress admin dashboard and open the playground page.

- enter as JSON Schema file :

  ```json
  {
    "title": "A single boolean field",
    "type": "boolean"
  }
  ```

- enter as JSON Schema UI file :

  ```json
  {}
  ```

- **HORRAY !** - we've got a checkbox rendered using the `@wordpress/components` package !

  _Don't worry about the styles. You can change it in `packages/wp-content/plugins/rjsf-renderer/src/rjsf-renderer-gutenberg/rjsf-renderer-gutenberg.scss` to whatever you need._

  I strongly recommend to disable the Bootstrap 3 styles at my local machine while developing the renderer.

  One more tip : disable validation in the preview UI of the playground to get not confused at the beginning

- Ok, lets go a step further - we want to be able to get a boolean rendered either as checkbox or as toggle (aka switch component) depending on the UI Schema :

- create a new File `packages/wp-content/plugins/rjsf-renderer/src/rjsf-renderer-gutenberg/components/widgets/ToggleWidget.jsx`

  Enter yet another checkbox like component - a toggle/switch :

  ```js
  import { FormToggle } from '@wordpress/components';
  import { descriptionId, getTemplate } from '@rjsf/utils';

  function ToggleWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
    const description = options.description ?? schema.description;

    const checked = typeof value === 'undefined' ? false : value;

    return (
      <>
        {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry}/>)}
        <FormToggle
          checked={checked}
          onChange={() => onChange(!checked)}
        />
      </>
    );
  }
  export default ToggleWidget;
  ```

  - add it to the widgets of the renderer by editing `packages/wp-content/plugins/rjsf-renderer/src/rjsf-renderer-gutenberg/components/widgets/index.js` :

  ```js
  ...
  import ToggleWidget from './ToggleWidget.jsx';
  ...
  function widgets() {
    // add the ToggleWidget to the exposed widgets
    return {
        ...
        ToggleWidget,
        ...
    };
  }
  ```

  - rebuild it : `pnpm run build`

  - reload the playground page of the WordPress admin dashboard in your browser.

  - enter same JSON Schema file as before :

    ```json
    {
      "title": "A single boolean field",
      "type": "boolean"
    }
    ```

  - enter a _slightly different_ JSON Schema UI file :

    ```json
    {
      "ui:widget": "ToggleWidget"
    }
    ```

  - **BAM !** - we've got a toggle rendered instead of a checkbox !

# Development workflow

It's actually dead simple :

1. Ensure you already started the development environment with `pnpm start`.

1. Change the renderer source code

1. rebuild the js/css bundles : `pnpm run build`.

1. go to or just reload the WordPress playground page in the WordPress admin dashboard in the browser.

  _Its a good idea to create your own JSON Schema in the playground using the React component you just changed to see a effect._

That's it !

# Links

- Take a look at the [react-jsonschema-form documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/)

- Checkout the [Gutenberg Storybook]https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page) to get example usage for almost any component available in [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/).
