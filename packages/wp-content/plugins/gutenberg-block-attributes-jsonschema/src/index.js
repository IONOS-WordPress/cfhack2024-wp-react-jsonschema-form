import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit.js';
import save from './save.js';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
