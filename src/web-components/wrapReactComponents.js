/* eslint-disable react/jsx-filename-extension,react/jsx-props-no-spreading */
import React from 'react';
import ReactWebComponent from './ReactWebComponent';
import configureStore from '../store/configureStore';
import ReduxContext from '../store/ReduxContext';
import { buildLoggers } from '../utils/log';

const { log, warn } = buildLoggers('initializeWebComponents');

const _getInjectedStyles = () => {
  const template = document.createElement('template');
  let style_strings = [];
  // todo: currently dependent on global variable; need a better solution
  if (window.__test_config__) {
    style_strings = window.__test_config__.css.imports.map((url) => `@import "${url}";`);
  } else {
    warn('__test_config__ variable is missing and is needed for base configuration');
  }

  if (process.env.NODE_ENV === 'development') {
    // During local development webpack injects some style tags into the header.  Webpack is using some css loader to do this.
    // This pulls out those style tags
    const head = document.getElementsByTagName('head')[0];
    const injectedNodes = head.getElementsByTagName('style');
    [...injectedNodes].forEach((node) => style_strings.push(node.innerHTML));
  }

  template.innerHTML = `<style>${style_strings.join('')}</style>`;

  // if (process.env.NODE_ENV === 'development') {
  //   // During local development webpack injects some style tags into the header.  Webpack is using some css loader to do this.
  //   // This pulls out those style tags
  //   const head = document.getElementsByTagName('head')[0];
  //   const injectedNodes = head.getElementsByTagName('style');
  //   styleNodes = [...injectedNodes];
  // } else {
  //   // Build a element with a style tag and some css imports.
  //   // todo: currently dependent on global variable; need a better solution
  //   const { __test_config__ } = window;
  //   if (__test_config__) {
  //     const template = document.createElement('template');
  //     template.innerHTML = `<style>${__test_config__.css.imports.map((url) => `@import "${url}";`).join('')}</style>`;
  //     styleNodes = [template];
  //   } else {
  //     warn('__test_config__ variable is missing and is needed for base configuration');
  //   }
  // }
  // log('_getInjectedStyles()', 'ENVIRONMENT:', process.env.NODE_ENV);
  return [template];
};

// const _getSyleString = () => {
//   let styleString = '';
//   if (process.env.NODE_ENV === 'development') {
//     // During local development webpack injects some style tags into the header.  Webpack is using some css loader to do this.
//     // This pulls out those style tags
//     const head = document.getElementsByTagName('head')[0];
//     const injectedNodes = head.getElementsByTagName('style');
//     styleString = [...injectedNodes].map((node) => node.innerHTML).join('');
//   } else {
//     // Build a element with a style tag and some css imports.
//     // todo: currently dependent on global variable; need a better solution
//     const { __test_config__ } = window;
//     if (__test_config__) {
//       styleString = __test_config__.css.imports.map((url) => `@import "${url}";`).join('');
//     } else {
//       warn('__test_config__ variable is missing and is needed for base configuration');
//     }
//   }
//   log('_getSyleString()', 'ENVIRONMENT:', process.env.NODE_ENV);
//   log('_getSyleString()', { styleString });
//   return styleString;
// };

/**
 * Builds a set of react components and wraps them in a web component and a redux context.
 *
 * @param componentManifest
 * @returns {{}}
 */
const wrapReactComponents = (componentManifest) => {
  const store = configureStore();
  const webComponentNames = Object.keys(componentManifest);
  const sharedStyleNodes = _getInjectedStyles();
  // const styleString = _getSyleString();

  webComponentNames.forEach((webComponentName) => {
    const ReactComponent = componentManifest[webComponentName];
    const ReduxReactComponent = (props) => (
      <ReduxContext store={store}>
        <ReactComponent {...props} />
      </ReduxContext>
    );
    ReactWebComponent.create(ReduxReactComponent, webComponentName, sharedStyleNodes);
  });
};


export default wrapReactComponents;
