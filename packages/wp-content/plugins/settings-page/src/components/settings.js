import validator from '@rjsf/validator-ajv8';
import Form from '@cfhack2024-wp-react-jsonschema-form/rjsf-renderer/gutenberg';

const config = window['settings_page'];

export default function Settings() {
  const saveChanges = async (form) => {
    const formData = new FormData();
    formData.append('settings_page', JSON.stringify(form.formData));
    formData.append('action', 'update');
    formData.append('option_page', 'options');
    formData.append('page_options', 'settings_page')
    formData.append('_wpnonce', config['_wpnonce']);

    await fetch('/wp-admin/options.php', {
      referrer: new URL('/wp-admin/options.php', window.location.href),
      body: formData,
      method: 'POST',
      redirect: 'manual'
    });
  };

  return (
    <Form
      schema={ JSON.parse(config.schema) }
      uiSchema={ JSON.parse(config.uiSchema)}
      validator={validator}
      liveValidate
      formData={ JSON.parse(config.value) }
      onSubmit={ saveChanges }
    />
  );
}
