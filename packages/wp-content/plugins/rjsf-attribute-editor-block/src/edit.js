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

  const onChange = (value) => {
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
  };

	return (
    <>
      <InspectorControls>
				<PanelBody title={ __( 'JSON Schema Form', 'rjsf-attribute-editor-block' ) } opened>
          <TextareaControl
            className='rjsf-attribute-editor-block-jsoneditor'
            label={ __( 'JSON form', 'rjsf-attribute-editor-block' ) }
            help={ __('This textarea acts as a placeholder for the JSON Schema form editor.', 'rjsf-attribute-editor-block') }
            required
            value={ intermediateValue }
            ref={ textareaRef }
            rows={ 15 }
            onChange={ onChange }
          />
          {/* this is just for demonstration purposes */}
          <div style={{ "color" : "#757575" }}>
            <div>
              JSON Schema (defined in block.json):
              <pre>{ JSON.stringify( BLOCK_JSON.jsonschema, null, 2) }</pre>
            </div>
            <div>
              JSON Schema UI(defined in block.json):
              <pre>{ JSON.stringify( BLOCK_JSON['jsonschema-ui'], null, 2) }</pre>
            </div>
          </div>
          {/* --- */}
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
