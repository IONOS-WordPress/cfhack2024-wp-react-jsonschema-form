import { Panel, PanelBody, TextareaControl } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';

export default function Sidebar() {
  const data = useSelect( select => {
    return select( 'core/editor' ).getEditedPostAttribute( 'meta' )['gutenberg-editor-sidebar-plugin-data'];
  }, [] );

  const { editPost } = useDispatch( 'core/editor' );
  const setData = useCallback( ( value ) => {
    editPost( { meta: { 'gutenberg-editor-sidebar-plugin-data' : value } } );
  }, [] );

  const [ intermediateValue, setIntermediateValue ] = useState(JSON.stringify(JSON.parse( data), null, 2));
  const textareaRef = useRef();

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
                className="gutenberg-editor-sidebar-plugin-jsoneditor"
                ref={ textareaRef }
                value={ intermediateValue }
                help={ __( 'This textarea acts as a placeholder for the JSON Schema form to be rendered. The entered data will be spit into the published page header.', 'gutenberg-editor-sidebar-plugin' ) }
                label={ __( 'JSON data', 'gutenberg-editor-sidebar-plugin' ) }
                onChange={ (value) => {
                  try {
                    const object = JSON.parse(value);
                    setData(JSON.stringify(object, null, 2));
                    textareaRef.current?.setCustomValidity('');
                  } catch(ex) {
                    textareaRef.current?.setCustomValidity(ex.message);
                  }
                  setIntermediateValue(value);
                }}
            />
          </PanelBody>
        </Panel>
      </PluginSidebar>
    </>
  );
}
