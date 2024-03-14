import { Component } from 'react';
import { Panel, PanelBody, } from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';

import STORE_KEY from './playground-store.js';

/*
  wrapper component to prevent crashing the while playground when jsfr rendering
  throws an exception as a result of an invalid schema / ui schema

  see https://blog.logrocket.com/react-error-handling-with-react-error-boundary/

  a error boundary needs to be a component / cannot be a functional component as of now (see React docs)
*/

import './error-boundary.scss';

class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    // Update store so the next render will show the fallback UI.
    dispatch(STORE_KEY).setError(error);
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   console.log(error, errorInfo);
  // }

  render() {
    if (this.props.error) {
      // You can render any custom fallback UI
      return (
        <Panel className="rjsf-preview-error-boundary" header="Error occurred while rendering JSON Schema form">
          <PanelBody title={ this.props.error.message }>
            <pre>
              { this.props.error.stack }
            </pre>
          </PanelBody>
        </Panel>
      );
    }

    return this.props.children;
  }
}

const withErrorProp = (Component) => {
  return props => {
    const { error } = useSelect((select) => {
      const store = select(STORE_KEY);
      return {
        error: store.getError(),
      };
    });
    return <Component error={error} {...props}/>;
  };
};

export default withErrorProp(ErrorBoundary);
