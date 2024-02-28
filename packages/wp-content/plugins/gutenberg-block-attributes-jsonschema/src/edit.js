import { __ } from '@wordpress/i18n';
import { useRef, useState } from 'react';
import { PanelBody, TextareaControl }  from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

import BLOCK_JSON from './block.json';

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
  const [ intermediateValue, setIntermediateValue ] = useState(JSON.stringify(json, null, 2));
  const textareaRef = useRef();

	return (
    <>
      <InspectorControls>
				<PanelBody title={ __( 'JSON Schema Form', 'gutenberg-block-attributes-jsonschema' ) } opened>
          <TextareaControl
            className='gutenberg-block-attributes-jsonschema-jsoneditor'
            label={ __( 'JSON form', 'gutenberg-block-attributes-jsonschema' ) }
            help={ __('This textarea acts as a placeholder for the JSON Schema form editor.', 'gutenberg-block-attributes-jsonschema') }
            required
            value={ intermediateValue }
            ref={ textareaRef }
            onChange={ (value) => {
              try {
                const object = JSON.parse(value);
                setAttributes( {
                  json: object,
                } );
                textareaRef.current?.setCustomValidity('');
              } catch(ex) {
                textareaRef.current?.setCustomValidity(ex.message);
              }
              setIntermediateValue(value);
            }}
          />
          <TextareaControl
            label={ __( 'JSON Schema of the form', 'gutenberg-block-attributes-jsonschema' ) }
            help={ __('This is just an informative section showing the jsonschema for the form.', 'gutenberg-block-attributes-jsonschema') }
            value={ JSON.stringify( BLOCK_JSON.jsonschema, null, 2) }
            disabled
          />
          <TextareaControl
            label={ __( 'JSON Schema UI of the form', 'gutenberg-block-attributes-jsonschema' ) }
            help={ __('This is just an informative section showing the jsonschema -ui for the form.', 'gutenberg-block-attributes-jsonschema') }
            value={ JSON.stringify( BLOCK_JSON['jsonschema-ui'], null, 2) }
            disabled
          />
        </PanelBody>
			</InspectorControls>
      <div { ...useBlockProps() }>
        <pre>
          { JSON.stringify(attributes.json || BLOCK_JSON.attributes.json.default, null, 2) }
        </pre>
      </div>
    </>
	);
}
