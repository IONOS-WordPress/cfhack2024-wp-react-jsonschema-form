import Form, { withTheme, getDefaultRegistry } from '@rjsf/core';

import './rjsf-renderer-gutenberg.scss';

window['rjsf']??={};
window['rjsf']['renderer']??={};
window['rjsf']['renderer']['gutenberg'] = {
  x : Form,
  y : withTheme,
  z : getDefaultRegistry,
};
