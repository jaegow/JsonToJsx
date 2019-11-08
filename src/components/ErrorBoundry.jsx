import React, { Component } from 'react';
import { buildLoggers } from '../utils/log';

const { log } = buildLoggers('ErrorBoundry');

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: undefined,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    log('componentDidCatch', { error, info });
  }

  render() {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;
    // log('render', {errorMessage});
    return !hasError
      ? children
      : (
        <div>
          <h1>Something went wrong.</h1>
          <p>{errorMessage}</p>
        </div>
      );
  }
}

export default ErrorBoundry;
