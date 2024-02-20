import { useState } from '@wordpress/element';
import { Panel, PanelBody, TextareaControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

export default function Settings() {
  const [json, setJSON] = useState(()=>'');

  const saveChanges = () => {
    alert(`saved "${json}"`);

    /*
    fetch("http://localhost:8888/wp-admin/options.php", {
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
      },
      "referrer": "http://localhost:8888/wp-admin/options.php",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "wp_attachment_pages_enabled=0&Update=Save+Changes",
      "method": "POST",
    });

    // Build formData object.
    let formData = new FormData();
    formData.append('xxx', 'John');
    formData.append('yyyy', 'John123');

    fetch("api/SampleData",
    {
        body: formData,
        method: "post"
    });
    */
  };

  return (
    <Panel header="My panel">
      <PanelBody title="My First section" opened>
        <TextareaControl
          label={ __( 'Plugin JSON settings', 'jsonschema-plugin-settings-page' ) }
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
