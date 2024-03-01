import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit.js';
import metadata from './block.json';

import icon from '../../../../../shared/src/hackathon-icon.js';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
  icon,
	edit: Edit,
	// No information saved to the block.
  // Data is saved to post meta via the hook.
  save: () => {
    return null;
  },
});
