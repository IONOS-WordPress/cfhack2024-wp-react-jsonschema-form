import Form, { withTheme, getDefaultRegistry } from '@rjsf/core';

window['rjsf']??={};
window['rjsf']['renderer']??={};
window['rjsf']['renderer']['gutenberg'] = {
  x : Form,
  y : withTheme,
  z : getDefaultRegistry,
};
