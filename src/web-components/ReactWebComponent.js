/* eslint-disable import/prefer-default-export,class-methods-use-this */
import React from 'react';
import ReactDOM from 'react-dom';
import extractAttributes from './extractAttributes';
import retargetEvents from './retargetEvents';

// import { buildLoggers } from '../utils/log';
// const { log } = buildLoggers('ReactWebComponent');

/**
 * @param {JSX.Element} JSXelement - React component passed in as JSX
 * @param {string} tagName - The name of the web component. Has to be minus "-" delimited.
 */
const create = (JSXelement, tagName, shadowNodes) => {
  let reactComponentInstance;

  const lifeCycleHooks = { attachedCallback: 'webComponentAttached',
    connectedCallback: 'webComponentConnected',
    disconnectedCallback: 'webComponentDisconnected',
    attributeChangedCallback: 'webComponentAttributeChanged',
    adoptedCallback: 'webComponentAdopted' };

  function callConstructorHook(webComponentInstance) {
    if (reactComponentInstance && reactComponentInstance.webComponentConstructed) {
      reactComponentInstance.webComponentConstructed.apply(reactComponentInstance, [webComponentInstance]);
    }
  }

  function callLifeCycleHook(hook, params) {
    const instanceParams = params || [];
    const instanceMethod = lifeCycleHooks[hook];

    if (instanceMethod && reactComponentInstance && reactComponentInstance[instanceMethod]) {
      // eslint-disable-next-line prefer-spread
      reactComponentInstance[instanceMethod].apply(reactComponentInstance, instanceParams);
    }
  }

  const ReactHTMLElement = class extends HTMLElement {
    mountPoint;

    mountReact() {
      const webComponentInstance = this;
      // log('mountReact()', 'this.componentAttributes:', this.componentAttributes);

      if (!this.mountPoint) {
        this.mountPoint = document.createElement('div');
        // !! HACK HARD CODED !! --> class added to block css from leaking to other components on the page
        // !! HACK HARD CODED !! --> class must match same class located here: src/styles/sass/mixins/_mixins.webcomponent.scss > webcomponentScope()
        this.mountPoint.className = 'pxwcs';

        // todo: should we close the shadow dom for distributions
        this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);

        if (shadowNodes && shadowNodes.length) {
          shadowNodes.forEach((childNode) => {
            const node = childNode.content || childNode;
            const clone = node.cloneNode(true);
            this.shadowRoot.appendChild(clone);
          });
        }
      }

      retargetEvents(this.shadowRoot);

      const reactComponentProps = extractAttributes(this);

      // eslint-disable-next-line react/jsx-filename-extension,react/jsx-props-no-spreading,func-names
      ReactDOM.render(<JSXelement {...reactComponentProps} />, this.mountPoint, function () {
        reactComponentInstance = this;
        callConstructorHook(webComponentInstance);
        callLifeCycleHook('connectedCallback');
      });
    }

    connectedCallback() {
      this.mountReact();
    }

    disconnectedCallback() {
      ReactDOM.unmountComponentAtNode(this.mountPoint);
      callLifeCycleHook('disconnectedCallback');
    }

    attributeChangedCallback(name, oldVal, newVal, namespace) {
      this.componentAttributes[name] = newVal;
      this.mountReactApp();
      callLifeCycleHook('attributeChangedCallback', [name, oldVal, newVal, namespace]);
    }

    // eslint-disable-next-line class-methods-use-this
    adoptedCallback(oldDocument, newDocument) {
      callLifeCycleHook('adoptedCallback', [oldDocument, newDocument]);
    }
  };

  customElements.define(tagName, ReactHTMLElement);
};


export default { create };
