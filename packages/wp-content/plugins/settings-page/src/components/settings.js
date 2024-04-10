import validator from "@rjsf/validator-ajv8";
import Form from "@cfhack2024-wp-react-jsonschema-form/rjsf-renderer/gutenberg";
import { __ } from '@wordpress/i18n';
import {
  // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
  __experimentalHeading as Heading,
} from '@wordpress/components';

const config = window["settings_page"];

export default function Settings() {
  const saveChanges = async (form) => {
    const formData = new FormData();
    formData.append("settings_page", JSON.stringify(form.formData));
    formData.append("action", "update");
    formData.append("option_page", "options");
    formData.append("page_options", "settings_page");
    formData.append("_wpnonce", config["_wpnonce"]);

    await fetch("/wp-admin/options.php", {
      referrer: new URL("/wp-admin/options.php", window.location.href),
      body: formData,
      method: "POST",
      redirect: "manual",
    });
  };

  return (
    <>
      <Heading level={ 4 }>
        { __( config.schema.title, 'woocommerce' ) }
      </Heading>
      <div className="description">
        { __( window["settings_page"].schema.description) }
      </div>
      <Form
        schema={config.schema}
        uiSchema={config.uiSchema}
        validator={validator}
        liveValidate
        formData={config.value}
        onSubmit={saveChanges}
      />
    </>
  );
}
