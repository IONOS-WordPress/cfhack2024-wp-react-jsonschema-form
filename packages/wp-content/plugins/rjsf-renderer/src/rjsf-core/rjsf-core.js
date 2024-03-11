import * as Exports from './../../node_modules/@rjsf/core/dist/index.esm.js';

/*
  exposes the the [`@rjsf/core`](https://www.npmjs.com/package/@rjsf/core) package.

  It is mapped to global variable `window.rjsf.core` in the browser.

  We actually need only a very few generic React components from [`@rjsf/core`](https://www.npmjs.com/package/@rjsf/core) for now
  but for the sake of simplicity we just expose it "as is".

  Later on we can fine tune the bundling the strip out the unneeded components.
*/

window['rjsf']??={};
window['rjsf']['core']=Exports;
