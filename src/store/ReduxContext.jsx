/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

const ReduxContext = ({
  store, children,
}) => (
  <Provider store={store}>
    { children }
  </Provider>
);

ReduxContext.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node,
};

ReduxContext.defaultProps = {
  children: undefined,
};

export default ReduxContext;
