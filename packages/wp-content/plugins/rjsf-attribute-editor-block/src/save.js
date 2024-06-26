import { useBlockProps, RichText } from '@wordpress/block-editor';

import BLOCK_JSON from './block.json';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes } ) {
  const blockProps = useBlockProps.save();

	return <div { ...blockProps }>
    <RichText.Content
      tagName={BLOCK_JSON.attributes.content.selector}
      value={ attributes.content }
      style= {{
        color : attributes.json.foregroundColor,
        backgroundColor : attributes.json.backgroundColor,
        textTransform: attributes.json.capitalize ? 'capitalize' : 'inherit',
        textDecoration: attributes.json.decoration ?? 'none'
      }}
    />
  </div>;
}
