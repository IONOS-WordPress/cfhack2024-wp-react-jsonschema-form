import { __ } from '@wordpress/i18n';
import { useRef, useState } from 'react';
import { TextareaControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';
import validator from '@rjsf/validator-ajv8';
import FormGutenberg from '@cfhack2024-wp-react-jsonschema-form/rjsf-renderer/gutenberg';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ setAttributes, attributes }) {
  const blockProps = useBlockProps();

  const { name: postType } = attributes;

  const postTypeObject = useSelect(
      ( select ) => select( 'core' ).getPostType( postType ),
      [ postType ]
  );

  if ( ! postTypeObject.schema ) {
    return (
      <div { ...blockProps }>
        { __( 'Error: no schema defined', 'site-builder-demo' ) }
      </div>
    );
  }

  const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

  let formData = {};
  Object.keys(postTypeObject.schema.properties).map((property) => {
    formData[property] = meta ? meta[property] : null;
  });

  const onChange = (value) => {
    setMeta( { ...meta, ...value } )
  };

  return (
    <div { ...blockProps }>
      <FormGutenberg
        schema={ postTypeObject.schema }
        ui_schema={ postTypeObject.ui_schema ?? null }
        validator={ validator }
        formData={ formData }
        onChange={ (e) => onChange(e.formData) }
        templates={{ ButtonTemplates: { SubmitButton : () => null } }}
      />
    </div>
  );
}
