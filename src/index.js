// // todo: separate builds for ie and other browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@webcomponents/webcomponentsjs';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import { buildLoggers } from './utils/log';

const { log } = buildLoggers('index.js');

log('all js should be loaded');

const { WebComponents } = window;
// At this point we are guaranteed that all required polyfills have
// loaded, and can use web components API's.
// The standard pattern is to load element definitions that call
// `customElements.define` here.
// Note: returning the import's promise causes the custom elements
// polyfill to wait until all definitions are loaded and then upgrade
// the document in one batch, for better performance.
WebComponents.waitFor(() => {
  log('WebComponents.waitFor', 'web components are ready');
  return import('./web-component-build');
});
