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

	return (
    <>
      <InspectorControls>
				<PanelBody title={ __( 'JSON Schema Form', 'gutenberg-form-block-jsonschema' ) } opened>
          <TextareaControl
            className="gutenberg-form-block-jsonschema-jsoneditor"
            label={ __( 'JSON Schema of the form', 'gutenberg-form-block-jsonschema' ) }
            help={ __('This textarea acts as a placeholder for the JSON Schema form editor.', 'gutenberg-form-block-jsonschema') }
            required
            value={ intermediateValue }
            ref={ textareaRef }
            onChange={ (value) => {
              try {
                const object = JSON.parse(value);
                setAttributes( {
                  jsonschema: value,
                } );
                textareaRef.current?.setCustomValidity('');
              } catch(ex) {
                textareaRef.current?.setCustomValidity(ex.message);
              }
              setIntermediateValue(value);
            }}
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
