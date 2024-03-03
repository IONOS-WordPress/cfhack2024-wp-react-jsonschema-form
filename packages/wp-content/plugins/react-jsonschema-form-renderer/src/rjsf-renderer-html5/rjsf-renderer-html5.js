import Form, { withTheme, getDefaultRegistry } from '@rjsf/core';

window['rjsf']??={};
window['rjsf']['renderer']??={};
window['rjsf']['renderer']['html5'] = {
  x : Form,
  y : withTheme,
  z : getDefaultRegistry,
};
