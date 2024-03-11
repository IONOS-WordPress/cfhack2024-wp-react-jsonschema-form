import { __ } from '@wordpress/i18n';
import { useRef, useState } from 'react';
import { PanelBody, TextareaControl }  from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { jsonschema } = attributes;
  const [ intermediateValue, setIntermediateValue ] = useState(jsonschema);
  const textareaRef = useRef();

  const onChange = (value) => {
    try {
      const object = JSON.parse(value);
      setAttributes( {
        jsonschema: value,
      });
      textareaRef.current?.setCustomValidity('');
    } catch(ex) {
      textareaRef.current?.setCustomValidity(ex.message);
    }
    setIntermediateValue(value);
  };

	return (
    <>
      <InspectorControls>
				<PanelBody title={ __( 'JSON Schema Form', 'form-block' ) } opened>
          <TextareaControl
            className="form-block-jsoneditor"
            label={ __( 'JSON Schema of the form', 'form-block' ) }
            help={ __('This textarea acts as a placeholder for the JSON Schema form editor.', 'form-block') }
            required
            value={ intermediateValue }
            ref={ textareaRef }
            rows={ 15 }
            onChange={ onChange }
          />
        </PanelBody>
			</InspectorControls>
      <div { ...useBlockProps() }>
        <pre>
          { attributes.jsonschema && JSON.stringify(JSON.parse( attributes.jsonschema), null, 2) }
        </pre>
      </div>
    </>
	);
}
