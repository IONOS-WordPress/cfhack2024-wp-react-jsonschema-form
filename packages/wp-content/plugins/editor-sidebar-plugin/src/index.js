import { registerPlugin } from '@wordpress/plugins';
import Sidebar from './components/sidebar.js';
import { Icon } from '@wordpress/components';

import './index.scss';

import HackathonIcon from './../../../../../shared/src/hackathon-icon.js';

registerPlugin( 'editor-sidebar-plugin', {
	icon : <Icon icon={ HackathonIcon }/>,
	render: Sidebar,
} );
