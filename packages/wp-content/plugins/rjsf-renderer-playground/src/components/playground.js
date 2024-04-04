import { useRef, useState, useEffect, createElement, forwardRef } from 'react';
import { Panel, PanelBody, TextareaControl, TabPanel, Toolbar, ToolbarButton, ToolbarGroup, } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

import validator from '@rjsf/validator-ajv8';
import FormGutenberg from '@cfhack2024-wp-react-jsonschema-form/rjsf-renderer/gutenberg';
import FormHtml5 from '@cfhack2024-wp-react-jsonschema-form/rjsf-renderer/html5';

import useTextareaAllowTabKey from './use-textareaallowtabkey.js';
import ErrorBoundary from './error-boundary.js'
import STORE_KEY from './playground-store.js';

import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "./split-pane.js";

import './playground.scss';

const config = window['rjsf-renderer-playground'];

const SourceEditor =function SourceEditor() {
  const { schema } = useSelect((select) => {
    const store = select(STORE_KEY);
    return {
      schema: store.getSchema(),
    };
  });
  const { setSchema } = useDispatch(STORE_KEY);

  const [ intermediateValue, setIntermediateValue ] = useState(JSON.stringify( JSON.parse(schema), null, 2));
  const textareaRef = useRef(null);

  useTextareaAllowTabKey(textareaRef);

  const onChange = (value) => {
    try {
      const object = JSON.parse(value);
      setSchema( JSON.stringify(object));
      textareaRef.current?.setCustomValidity('');
    } catch(ex) {
      textareaRef.current?.setCustomValidity(ex.message);
    }
    setIntermediateValue(value);
  };

  return (
    <TextareaControl
      className="rjsf-renderer-playground-jsoneditor"
      label={ __( 'JSON Schema', 'rjsf-renderer-playground' ) }
      help={ __("This textarea acts as a placeholder for the JSON Schema source editor to be rendered.", 'rjsf-renderer-playground') }
      value={ intermediateValue }
      ref={ textareaRef }
      onChange={ onChange }
    />
  );
}

function GraphicalEditor() {
  const { schema } = useSelect((select) => {
    const store = select(STORE_KEY);
    return {
      schema: store.getSchema(),
    };
  });
  const { setSchema } = useDispatch(STORE_KEY);

  const iframeRef = useRef();

  useEffect(() => {
    function onEditorChange(e) {
      if (e.source !== iframeRef.current.contentWindow) return;
      try {
        setSchema(e.data);
      } catch (e) {
        // ignore
        console.error(e);
      }
    }
    window.addEventListener("message", onEditorChange);
    return () => {
      window.removeEventListener("message", onEditorChange);
    }
  });

  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = function () {
        setIframeLoaded(true);
      }
    }
  }, [iframeRef.current]);

  useEffect(() => {
    if (iframeLoaded) {
      iframeRef.current.contentWindow.postMessage(schema, '*');
    }
  }, [schema, iframeLoaded]);

  return (
    <iframe className="schema-editor-iframe" ref={iframeRef} id="formbuilder-embedded" src="/wp-content/plugins/formbuilder-embedded/dist/index.html"></iframe>
  );
}

function JSONSchemaEditor() {
  return (
    <TabPanel
      tabs={ [
        {
          name: 'source-editor',
          title: __('JSON Schema Source', 'rjsf-renderer-playground')
        },
        {
          name: 'graphical-editor',
          title: __('JSON Schema graphical editor', 'rjsf-renderer-playground'),
        },
      ] }
    >
      {
        (tab) => {
          switch(tab.name) {
            case 'source-editor' :
              return (<SourceEditor/>)
            case 'graphical-editor' :
              return ( <GraphicalEditor /> );
          }
        }
      }
    </TabPanel>
  );
}

function JSONSchemaUIEditor() {
  const { uiSchema } = useSelect((select) => {
    const store = select(STORE_KEY);
    return {
      uiSchema: store.getUISchema(),
    };
  });
  const { setUISchema } = useDispatch(STORE_KEY);

  const [ intermediateValue, setIntermediateValue ] = useState(JSON.stringify( JSON.parse( uiSchema), null, 2));
  const textareaRef = useRef();

  useTextareaAllowTabKey(textareaRef);

  const onChange = (value) => {
    try {
      const object = JSON.parse(value);
      setUISchema( JSON.stringify(object));
      textareaRef.current?.setCustomValidity('');
    } catch(ex) {
      textareaRef.current?.setCustomValidity(ex.message);
    }
    setIntermediateValue(value);
  };

  return (
    <TextareaControl
      className="rjsf-renderer-playground-jsoneditor"
      label={ __( 'UISchema', 'rjsf-renderer-playground' ) }
      help={ __("This textarea acts as a placeholder for the UI Schema editor.", 'rjsf-renderer-playground') }
      value={ intermediateValue }
      ref={ textareaRef }
      onChange={ onChange }
    />
  );
}

function Preview() {
  const { schema, uiSchema, renderer, isPreviewLiveValidate, formData } = useSelect((select) => {
    const store = select(STORE_KEY);

    return {
      schema: JSON.parse(store.getSchema()),
      uiSchema: JSON.parse(store.getUISchema()),
      renderer: store.getRenderer(),
      isPreviewLiveValidate : store.isPreviewLiveValidate(),
      formData: store.getFormData(),
    };
  });
  const { setRenderer, setPreviewLiveValidate, setFormData } = useDispatch(STORE_KEY);

  const togglePreviewLifeValidate = () => {
    setPreviewLiveValidate(!isPreviewLiveValidate);
  };

  return (
    <div className="rjsf-preview">
      <div className="rjsf-preview-header">
        <strong className="rjsf-preview-header-title">Preview</strong>
        <Toolbar label="preview toolbar" variant='unstyled'>
          <ToolbarGroup>
            <ToolbarButton
              text={ __('Live validation', 'rjsf-renderer-playground') }
              isPressed={isPreviewLiveValidate}
              onClick={togglePreviewLifeValidate}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarButton
              text={ __('Clear form data', 'rjsf-renderer-playground') }
              onClick={() => setFormData({}) }
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarButton
              text={ __('Renderer: ', 'rjsf-renderer-playground') }
              disabled
            />
            <ToolbarButton
              text={ __('Gutenberg', 'rjsf-renderer-playground') }
              isPressed={renderer==='gutenberg'}
              onClick={() => setRenderer('gutenberg') }
            />
            <ToolbarButton
              text={ __('HTML5', 'rjsf-renderer-playground') }
              isPressed={renderer==='html5'}
              onClick={() => setRenderer('html5') }
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
      <div className="rjsf-preview-container">
        <ErrorBoundary>
          {
            createElement(renderer==='gutenberg' ? FormGutenberg : FormHtml5, {
              schema : schema,
              uiSchema : uiSchema,
              validator,
              liveValidate : isPreviewLiveValidate,
              formData,
              onChange: (value) => setFormData(value.formData),
            })
          }
        </ErrorBoundary>
      </div>
      <Panel header={ __('Form data', 'rjsf-renderer-playground')}>
        <PanelBody>
          { JSON.stringify( formData, null, '') }
        </PanelBody>
      </Panel>
    </div>
  );
}

export default function Playground() {
  return (
    <Panel header="rjsf-renderer-playground">
      <PanelBody>
        <SplitPane className="split-pane-row">
          <SplitPaneLeft>

            <SplitPane className="split-pane-col">
              <SplitPaneTop>
                <JSONSchemaEditor/>
              </SplitPaneTop>
              <Divider className="separator-row" />
              <SplitPaneBottom>
                <JSONSchemaUIEditor/>
              </SplitPaneBottom>
            </SplitPane>

          </SplitPaneLeft>
          <Divider className="separator-col" />
          <SplitPaneRight>
            <Preview/>
          </SplitPaneRight>
        </SplitPane>
      </PanelBody>
    </Panel>
  );
}
