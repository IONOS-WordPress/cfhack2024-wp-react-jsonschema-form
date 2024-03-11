import Form, { withTheme } from '@rjsf/core';

/*
  this script exposes our HTML5 renderer to the frontend

  the change the rendered ui go into `components` subdirectory and start hacking.
*/

// everything imported in getDefaultRegistry.js is a 1:1 copy of the rjsf bootstrap 3 renderer (https://github.com/rjsf-team/react-jsonschema-form/tree/v5.17.1/packages/core/src)
// @TODO: needs to be refactored to render plain html
import getDefaultRegistry from './getDefaultRegistry.js';

import './rjsf-renderer-html5.scss';

function Html5Form(props) {
  // append our custom renderer className
  const className = `${props?.className??''} rjsf rjsf-renderer-html5`;

  return <Form className={ className } { ...props }/>
}

window['rjsf']??={};
window['rjsf']['renderer']??={};
window['rjsf']['renderer']['html5'] = {
  default : Html5Form,
  withTheme,
  getDefaultRegistry,
  // fake a wrapped ecmascript module
  __esModule : { value: true },
};
