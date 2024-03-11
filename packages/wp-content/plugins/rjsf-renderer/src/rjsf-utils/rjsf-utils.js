import * as Exports from './../../node_modules/@rjsf/utils/dist/utils.esm.js';

/*
  Exposes [`@rjsf/utils`](https://www.npmjs.com/package/@rjsf/utils) package.

  It contains a huge bunch of utility functions used by renderers including
  the @rjsf/core package and is required as script dependency if you want to render.
*/

window['rjsf']??={};
window['rjsf']['utils']=Exports;
