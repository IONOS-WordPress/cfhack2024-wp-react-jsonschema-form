import { __ } from '@wordpress/i18n';
import { useRef, useState } from 'react';
import { PanelBody, TextareaControl }  from '@wordpress/components';
import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';
import validator from "@rjsf/validator-ajv8";
import { getDefaultFormState } from "@rjsf/utils";
import Form from "@cfhack2024-wp-react-jsonschema-form/rjsf-renderer/gutenberg";

import './editor.scss';

import BLOCK_JSON from './block.json';
const { jsonSchema, jsonSchemaUi } = BLOCK_JSON;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { json } = attributes;

    // reset to default value if current data does'nt match the schema anymore
  if(!validator.isValid(jsonSchema, json, jsonSchema)) {
    setAttributes({ json : getDefaultFormState(validator, jsonSchema, json, jsonSchema)});
  }

  const onChange = (form) => {
    setAttributes( {
      json: form.formData,
    } );
  };

  return (
    <>
      <InspectorControls>
        <Form
          schema={jsonSchema}
          uiSchema={jsonSchemaUi}
          validator={validator}
          liveValidate
          formData={json}
          onChange={onChange}
        />
			</InspectorControls>
      <RichText
          tagName={BLOCK_JSON.attributes.content.selector}
          value={attributes.content}
          onChange={(content) => setAttributes({ content })}
          placeholder={__('Enter text...', 'rjsf-attribute-editor-block')}
          { ...useBlockProps() }
          style= { { color : json.foregroundColor, backgroundColor : json.backgroundColor, textTransform: json.capitalize ? 'capitalize' : 'inherit', textDecoration: json.decoration ?? 'none'} }
      />
    </>
	);
}
