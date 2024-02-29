import { useRef, useState } from 'react';
import { PanelBody, TextareaControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const config = window['theme-extending-global-styles-jsonschema'];

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
    formData.append('theme-extending-global-styles-jsonschema', json);
    formData.append('action', 'update');
    formData.append('option_page', 'options');
    formData.append('page_options', 'theme-extending-global-styles-jsonschema')
    formData.append('_wpnonce', config['_wpnonce']);

    await fetch('/wp-admin/options.php', {
      referrer: new URL('/wp-admin/options.php', window.location.href),
      body: formData,
      method: 'POST',
      redirect: 'manual'
    });
  };

  return (
    <PanelBody /* initialOpen={ false } */ opened title={ __('Custom theme settings', 'theme-extending-global-styles-jsonschema') }>
      <TextareaControl
        className="theme-extending-global-styles-jsonschema"
        label={ __( 'JSON', 'theme-extending-global-styles-jsonschema' ) }
        help={ __('This textarea acts as a placeholder for the JSON Schema form to be rendered.', 'theme-extending-global-styles-jsonschema') }
        value={ intermediateValue }
        ref={ textareaRef }
          onChange={ (value) => {
            try {
              const object = JSON.parse(value);
              setJSON( JSON.stringify(object));
              textareaRef.current?.setCustomValidity('');
            } catch(ex) {
              textareaRef.current?.setCustomValidity(ex.message);
            }
            setIntermediateValue(value);
          }}
      />
      <Button
        variant="primary"
        disabled={ !canSave }
        onClick={ saveChanges }
      >
        { __('Save Changes') }
      </Button>
    </PanelBody>
  );
}
