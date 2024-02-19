import { registerPlugin } from '@wordpress/plugins';
import Sidebar from './components/sidebar.js';

import './index.scss';

registerPlugin( 'gutenberg-editor-sidebar-plugin', {
	icon: 'admin-site',
	render: Sidebar,
} );
