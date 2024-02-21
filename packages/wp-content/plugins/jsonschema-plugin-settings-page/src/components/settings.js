import { useState } from '@wordpress/element';
import { Panel, PanelBody, TextareaControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const config = window['jsonschema_plugin_settings_page'];

export default function Settings() {
  const [json, setJSON] = useState(config['value']);

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

  return (
    <Panel header="jsonschema-plugin-settings-page">
      <PanelBody title="Plugin settings" opened>
        <TextareaControl
          label={ __( 'JSON', 'jsonschema-plugin-settings-page' ) }
          help={ __("This textarea acts as a placeholder for the JSON Schema form to be rendered.") }
          value={ json }
          onChange={ ( value ) => setJSON( value ) }
        />
        <Button
          variant="primary"
          onClick={ saveChanges }
        >
          { __('Save Changes') }
        </Button>
      </PanelBody>
    </Panel>
  );
}
