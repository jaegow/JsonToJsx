/* eslint-disable consistent-return,no-restricted-syntax,no-prototype-builtins,no-param-reassign,no-plusplus,func-names */
import { buildLoggers } from '../utils/log';

const { todo } = buildLoggers('retargetEvents');

todo('refactor until all eslint-disables are gone');

const reactEvents = ['onAbort', 'onAnimationCancel', 'onAnimationEnd', 'onAnimationIteration', 'onAuxClick', 'onBlur',
  'onChange', 'onClick', 'onClose', 'onContextMenu', 'onDoubleClick', 'onError', 'onFocus', 'onGotPointerCapture',
  'onInput', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onLoad', 'onLoadEnd', 'onLoadStart', 'onLostPointerCapture',
  'onMouseDown', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onPointerCancel', 'onPointerDown',
  'onPointerEnter', 'onPointerLeave', 'onPointerMove', 'onPointerOut', 'onPointerOver', 'onPointerUp', 'onReset',
  'onResize', 'onScroll', 'onSelect', 'onSelectionChange', 'onSelectStart', 'onSubmit', 'onTouchCancel',
  'onTouchMove', 'onTouchStart', 'onTransitionCancel', 'onTransitionEnd', 'onDrag', 'onDragEnd', 'onDragEnter',
  'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onFocusOut'];

const divergentNativeEvents = { onDoubleClick: 'dblclick' };
const mimickedReactEvents = { onInput: 'onChange', onFocusOut: 'onBlur', onSelectionChange: 'onSelect' };

function findReactComponent(item) {
  for (const key in item) {
    if (item.hasOwnProperty(key) && key.indexOf('_reactInternal') !== -1) {
      return item[key];
    }
  }
}

function findReactProps(component) {
  if (!component) return undefined;
  if (component.memoizedProps) return component.memoizedProps; // React 16 Fiber
  if (component._currentElement && component._currentElement.props) return component._currentElement.props; // React <=15
}

function dispatchEvent(event, eventType, componentProps) {
  event.persist = function () {
    event.isPersistent = function () { return true; };
  };

  if (componentProps[eventType]) {
    componentProps[eventType](event);
  }
}

function getNativeEventName(reactEventName) {
  if (divergentNativeEvents[reactEventName]) {
    return divergentNativeEvents[reactEventName];
  }
  return reactEventName.replace(/^on/, '').toLowerCase();
}

function composedPath(el) {
  const path = [];
  while (el) {
    path.push(el);
    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
}

const retargetEvents = (shadowRoot) => {
  const removeEventListeners = [];

  reactEvents.forEach((reactEventName) => {
    const nativeEventName = getNativeEventName(reactEventName);

    function retargetEvent(event) {
      const path = event.path || (event.composedPath && event.composedPath()) || composedPath(event.target);

      for (let i = 0; i < path.length; i++) {
        const el = path[i];
        const reactComponent = findReactComponent(el);
        const props = findReactProps(reactComponent);

        if (reactComponent && props) {
          dispatchEvent(event, reactEventName, props);
        }

        if (reactComponent && props && mimickedReactEvents[reactEventName]) {
          dispatchEvent(event, mimickedReactEvents[reactEventName], props);
        }

        if (event.cancelBubble) {
          break;
        }

        if (el === shadowRoot) {
          break;
        }
      }
    }

    shadowRoot.addEventListener(nativeEventName, retargetEvent, false);

    removeEventListeners.push(() => { shadowRoot.removeEventListener(nativeEventName, retargetEvent, false); });
  });

  return function () {
    removeEventListeners.forEach((removeEventListener) => {
      removeEventListener();
    });
  };
};

export default retargetEvents;
