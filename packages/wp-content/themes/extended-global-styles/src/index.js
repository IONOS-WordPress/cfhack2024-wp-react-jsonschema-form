import React from 'react';

import Settings from "./components/settings.js";

import './index.scss';

// hijack React.createElement only in case we are loaded into site editor
if(document.location.pathname.endsWith('site-editor.php')) {
  const { createElement } = React;

  React.createElement = (...args) => {
    // inject our settings panel right after GlobalStylesUI
    if( args?.[0]?.name == 'GlobalStylesUI') {
        return (
          <>
            { createElement(...args) }
            <Settings/>
          </>
        );
    }
    return createElement(...args);
  }

  /*
    // see https://stackoverflow.com/questions/70752355/i-overridden-react-createelement-but-jsxs-button-doesnt-seem-to-call-react-cr

    // Prod mode
    import jsxRuntime from 'react/jsx-runtime'
    const jsx = jsxRuntime.jsx;
    jsxRuntime.jsx = (...args) => {
      console.log("jsxRuntime.jsx : ", { args });
      return jsx(...args);
    }

    // Dev mode
    import jsxRuntime from 'react/jsx-runtime'
    const jsxDev = jsxRuntime.jsxDEV;
    jsxRuntime.jsxDEV = (...args) => {
      console.log("jsxRuntime.jsxDEV : ", { args });
      return jsxDev(...args);
    }
  */
}
