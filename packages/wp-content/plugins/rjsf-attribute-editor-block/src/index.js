import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit.js';
import save from './save.js';
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
	save,
} );
