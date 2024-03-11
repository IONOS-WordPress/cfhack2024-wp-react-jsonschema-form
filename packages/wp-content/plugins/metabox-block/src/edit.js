import { __ } from '@wordpress/i18n';
import { useRef, useState } from 'react';
import { TextareaControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';

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

  const metaValue = meta[ 'metabox-block-data' ];
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

  return (
    <div { ...blockProps }>
      <TextareaControl
        className="metabox-block-jsoneditor"
        value={ intermediateValue }
        help={ __( 'This textarea acts as a placeholder for the JSON Schema form to be rendered. The entered data will be spit into the published page header.', 'metabox-block' ) }
        label={ __( 'JSON Post Meta data', 'metabox-block' ) }
        ref={ textareaRef }
        onChange={ onChange }
      />
    </div>
  );
}
