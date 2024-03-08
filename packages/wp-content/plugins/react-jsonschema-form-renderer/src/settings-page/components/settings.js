import { useRef, useState } from 'react';
import { Panel, PanelBody, TextareaControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import validator from '@rjsf/validator-ajv8';
import FormGutenberg/*, { withTheme, getDefaultRegistry }*/ from '@cfhack2024-wp-react-jsonschema-form/react-jsonschema-form-renderer/gutenberg';
import FormHtml5/*, { withTheme, getDefaultRegistry }*/ from '@cfhack2024-wp-react-jsonschema-form/react-jsonschema-form-renderer/html5';

// /* this is just for debugging purposes */
// import Renderer from '@cfhack2024-wp-react-jsonschema-form/react-jsonschema-form-renderer';
// import * as Html from '@cfhack2024-wp-react-jsonschema-form/react-jsonschema-form-renderer/html5';
// import * as Gutenberg from '@cfhack2024-wp-react-jsonschema-form/react-jsonschema-form-renderer/gutenberg';

// // dump imported renderer symbols
// console.log({
//   validator,
//   Renderer,
//   Html,
//   Gutenberg,
// });
// /* -- */

const config = window['jsonschema_plugin_settings_page'];
// console.log(config);

export default function Settings() {
  const [json, setJSON] = useState(config['value']);
  const [ intermediateValue, setIntermediateValue ] = useState(JSON.stringify( JSON.parse( json), null, 2));
  const textareaRef = useRef();

  const canSave = (() => {
    try {
      JSON.parse(intermediateValue);
      return true;
    } catch {
      return false;
    }
  })();

  const saveChanges = async () => {
    const formData = new FormData();
    formData.append('jsonschema_plugin_settings_page', json);
    formData.append('action', 'update');
    formData.append('option_page', 'options');
    formData.append('page_options', 'jsonschema_plugin_settings_page')
    formData.append('_wpnonce', config['_wpnonce']);

    await fetch('/wp-admin/options.php', {
      referrer: new URL('/wp-admin/options.php', window.location.href),
      body: formData,
      method: 'POST',
      redirect: 'manual'
    });
  };

  const onChange = (value) => {
    try {
      const object = JSON.parse(value);
      setJSON( JSON.stringify(object));
      textareaRef.current?.setCustomValidity('');
    } catch(ex) {
      textareaRef.current?.setCustomValidity(ex.message);
    }
    setIntermediateValue(value);
  };
  return (
    <>
      <h3>#### Handcoded Gutenberg Form ####</h3>
      <Panel header="react-jsonschema-form-renderer">
        <PanelBody title={ __('Plugin settings') } opened>
          <TextareaControl
            className="react-jsonschema-form-renderer-jsoneditor"
            label={ __( 'JSON', 'react-jsonschema-form-renderer' ) }
            help={ __("This textarea acts as a placeholder for the JSON Schema form to be rendered.") }
            value={ intermediateValue }
            ref={ textareaRef }
            onChange={ onChange }
          />
          <Button
            variant="primary"
            disabled={ !canSave }
            onClick={ saveChanges }
          >
            { __('Save Changes') }
          </Button>
        </PanelBody>
      </Panel>
      <hr/>
      <h3>#### Gutenberg Form rendered with Gutenberg Renderer ####</h3>
      <FormGutenberg schema={config['jsonschema']} uiSchema={config['jsonschema-ui']} validator={validator} />
      {/*
      <FormGutenberg schema={config['jsonschema']} uiSchema={config['jsonschema-ui']} validator={validator}></FormGutenberg>
      */}
      <hr/>
      <h3>#### Gutenberg Form rendered with Html5 Renderer ####</h3>
      <FormHtml5 schema={config['jsonschema']} uiSchema={config['jsonschema-ui']} validator={validator}>
      </FormHtml5>
    </>
  );
}
