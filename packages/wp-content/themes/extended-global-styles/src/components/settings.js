import { useRef, useState } from 'react';
import { PanelBody, TextareaControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const config = window['extended-global-styles'];

import Icon from '../../../../../../shared/src/hackathon-icon.js';

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
    formData.append('extended-global-styles', json);
    formData.append('action', 'update');
    formData.append('option_page', 'options');
    formData.append('page_options', 'extended-global-styles')
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
    <PanelBody /* initialOpen={ false } */ opened title={ __('JSON Schema theme settings', 'extended-global-styles') } icon={ Icon }>
      <TextareaControl
        className="extended-global-styles"
        label={ __( 'JSON', 'extended-global-styles' ) }
        help={ __('This textarea acts as a placeholder for the JSON Schema form to be rendered.', 'extended-global-styles') }
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
  );
}
