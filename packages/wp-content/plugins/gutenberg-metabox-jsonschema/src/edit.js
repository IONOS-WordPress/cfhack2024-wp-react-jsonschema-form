import { __ } from '@wordpress/i18n';
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

  const metaValue = meta[ 'our_metabox_data' ];
  const updateMetaValue = ( newValue ) => setMeta( { ...meta, our_metabox_data: newValue } );

  return (
    <div { ...blockProps }>
      <TextareaControl
        value={ metaValue }
        help={ __( 'This textarea acts as a placeholder for the JSON Schema form to be rendered.', 'gutenberg-metabox-jsonschema' ) }
        label={ __( 'JSON Post Meta data', 'gutenberg-metabox-jsonschema' ) }
        onChange={ updateMetaValue }
      />
    </div>
  );
}
