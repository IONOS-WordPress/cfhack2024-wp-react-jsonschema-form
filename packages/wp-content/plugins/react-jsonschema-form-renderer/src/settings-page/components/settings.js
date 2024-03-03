import { useRef, useState } from 'react';
import { Panel, PanelBody, TextareaControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const config = window['jsonschema_plugin_settings_page'];

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
  );
}
