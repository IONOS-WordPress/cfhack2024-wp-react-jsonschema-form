import { Panel, PanelBody, TextareaControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';

export default function Sidebar() {
  const data = useSelect( select => {
    return select( 'core/editor' ).getEditedPostAttribute( 'meta' ).our_data;
  }, [] );

  const { editPost } = useDispatch( 'core/editor' );
  const onChangeData = useCallback( ( value ) => {
    editPost( { meta: { our_data : value } } );
  }, [] );

  return (
    <>
      <PluginSidebarMoreMenuItem target="gutenberg-editor-sidebar-plugin-panel">
      { __( 'cfhack2024 Sidebar Plugin', 'gutenberg-editor-sidebar-plugin' ) }
      </PluginSidebarMoreMenuItem>
      <PluginSidebar
          name="gutenberg-editor-sidebar-plugin-panel"
          title={ __( 'cfhack2024 Sidebar Plugin', 'gutenberg-editor-sidebar-plugin' ) }
      >
        <Panel>
          <PanelBody
              title={ __( 'cfhack2024 Sidebar Plugin JSON Schema Form', 'gutenberg-editor-sidebar-plugin' ) }
          >
            <TextareaControl
                value={ data }
                help={ __( 'This textarea acts as a placeholder for the JSON Schema form to be rendered.', 'gutenberg-editor-sidebar-plugin' ) }
                label={ __( 'JSON data', 'gutenberg-editor-sidebar-plugin' ) }
                onChange={ onChangeData }
            />
          </PanelBody>
        </Panel>
      </PluginSidebar>
    </>
  );
}
