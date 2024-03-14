import { createReduxStore, register } from "@wordpress/data";

/*
  our redux store for the editor-playground
*/
const KEY='@cfhack2024-wp-react-jsonschema-form/rjsf-renderer-playground';

export default KEY;

(function (settings) {
  let initialState = {
    schema : typeof(settings['jsonschema'])!=='string' ? JSON.stringify(settings['jsonschema'], null, '  ') : settings['jsonschema'],
    uiSchema : typeof(settings['jsonschema-ui'])!=='string' ? JSON.stringify(settings['jsonschema-ui'], null, '  ') : settings['jsonschema-ui'],
    renderer : 'gutenberg',
    previewLiveValidate : false,
    error : null,
    formData : {},
  };

  // read persisted data from localStorage
  const STORAGE_PREFIX = 'playground-store.';
  Object.keys(window.localStorage)
    .filter(key=>key.startsWith(STORAGE_PREFIX))
    .map(key => {
      const storeProperty = key.substring(STORAGE_PREFIX.length);
      const storeValue = JSON.parse( window.localStorage.getItem(key) );
      initialState[storeProperty]=storeValue
    }
  );

  // persist state to localStorage
  function persist(state) {
    Object.keys(state)
      .filter(key=>key!=='error') // don't persist the error state
      .map(key => {
        const storeValue = JSON.stringify( state[key] );
        window.localStorage.setItem(STORAGE_PREFIX + key, storeValue);
      }
    );
    return state;
  }

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_SCHEMA": {
        return persist({
          ...state,
          schema : payload,
          error: null,
        });
      }
      case "SET_ERROR": {
        return persist({
          ...state,
          error : payload,
        });
      }
      case "SET_FORMDATA": {
        return persist({
          ...state,
          formData : payload,
          error : null,
        });
      }
      case "SET_UISCHEMA": {
        return persist({
          ...state,
          uiSchema : payload,
          error: null,
        });
      }
      case "SET_RENDERER": {
        return persist({
          ...state,
          renderer : payload,
          error: null,
        });
      }
      case "SET_PREVIEW_LIVEVALIDATE": {
        return persist({
          ...state,
          previewLiveValidate : payload,
          error: null,
        });
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
    setError(error) {
      return {
        type: "SET_ERROR",
        payload: error,
      };
    },
    setFormData(formData) {
      return {
        type: "SET_FORMDATA",
        payload: formData,
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
    getError(state) {
      return state.error;
    },
    getFormData(state) {
      return state.formData;
    },
  };
  const resolvers = {};

  register(createReduxStore(KEY, {
    __experimentalUseThunks: true,
    reducer,
    actions,
    selectors,
    resolvers,
    initialState,
  }));

})(window['rjsf-renderer-playground']);
