import { registerPlugin } from '@wordpress/plugins';
import Sidebar from './components/sidebar.js';

import './index.scss';

import icon from '../../../../../shared/src/hackathon-icon.js';

registerPlugin( 'gutenberg-editor-sidebar-plugin', {
	icon,
	render: Sidebar,
} );
