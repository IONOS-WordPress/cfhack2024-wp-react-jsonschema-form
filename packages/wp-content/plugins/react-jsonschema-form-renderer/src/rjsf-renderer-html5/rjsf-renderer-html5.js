import Form, { withTheme, getDefaultRegistry } from '@rjsf/core';

import './rjsf-renderer-html5.scss';

window['rjsf']??={};
window['rjsf']['renderer']??={};
window['rjsf']['renderer']['html5'] = {
  x : Form,
  y : withTheme,
  z : getDefaultRegistry,
};
