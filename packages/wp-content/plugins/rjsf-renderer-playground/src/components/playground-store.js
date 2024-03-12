import { createReduxStore, register } from "@wordpress/data";

/*
  our redux store for the editor-playground
*/
const KEY='@cfhack2024-wp-react-jsonschema-form/rjsf-renderer-playground';

export default KEY;

(function (settings) {
  const DEFAULT_STATE = {
    schema : typeof(settings['jsonschema'])!=='string' ? JSON.stringify(settings['jsonschema'], null, '  ') : settings['jsonschema'],
    uiSchema : typeof(settings['jsonschema-ui'])!=='string' ? JSON.stringify(settings['jsonschema-ui'], null, '  ') : settings['jsonschema-ui'],
    renderer : 'gutenberg',
    previewLiveValidate : true,
  };

  const reducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case "SET_SCHEMA": {
        return {
          ...state,
          schema : payload,
        };
      }
      case "SET_UISCHEMA": {
        return {
          ...state,
          uiSchema : payload,
        };
      }
      case "SET_RENDERER": {
        return {
          ...state,
          renderer : payload,
        };
      }
      case "SET_PREVIEW_LIVEVALIDATE": {
        return {
          ...state,
          previewLiveValidate : payload,
        };
      }
    }

    return state;
  };

  const actions = {
    setSchema(schema) {
      return {
        type: "SET_SCHEMA",
        payload: schema,
      };
    },
    setUISchema(uiSchema) {
      return {
        type: "SET_UISCHEMA",
        payload: uiSchema,
      };
    },
    setRenderer(renderer) {
      return {
        type: "SET_RENDERER",
        payload: renderer,
      };
    },
    setPreviewLiveValidate(previewLiveValidate) {
      return {
        type: "SET_PREVIEW_LIVEVALIDATE",
        payload: previewLiveValidate,
      };
    },
  };
  const selectors = {
    getSchema(state) {
      return state.schema;
    },
    getUISchema(state) {
      return state.uiSchema;
    },
    getRenderer(state) {
      return state.renderer;
    },
    isPreviewLiveValidate(state) {
      return state.previewLiveValidate;
    },
  };
  const resolvers = {};

  register(createReduxStore(KEY, {
    __experimentalUseThunks: true,
    reducer,
    actions,
    selectors,
    resolvers,
  }));
})(window['rjsf-renderer-playground']);
