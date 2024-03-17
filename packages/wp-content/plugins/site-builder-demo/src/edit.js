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
  const postType = useSelect(
      ( select ) => select( 'core/editor' ).getCurrentPostType(),
      []
  );

  const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

  const metaValue = '{}';
  const updateMetaValue = ( newValue ) => setMeta( { ...meta, 'metabox-block-data' : newValue } );

  const [ intermediateValue, setIntermediateValue ] = useState(JSON.stringify(JSON.parse( metaValue), null, 2));
  const textareaRef = useRef();

  const onChange = (value) => {
    try {
      const object = JSON.parse(value);
      updateMetaValue(JSON.stringify(object, null, 2));
      textareaRef.current?.setCustomValidity('');
    } catch(ex) {
      textareaRef.current?.setCustomValidity(ex.message);
    }
    setIntermediateValue(value);
  };
  console.log(attributes);

  return (
    <div { ...blockProps }>
      <FormGutenberg
        schema={ attributes.schema }
        ui_schema={ attributes.ui_schema }
        validator={ validator }
        formData={ attributes.formData }
        onChange={ (e) => setAttributes({ formData: e.formData }) }
      />
    </div>
  );
}
