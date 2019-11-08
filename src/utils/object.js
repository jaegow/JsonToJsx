/* eslint-disable no-restricted-syntax */
import { buildLoggers } from './log';

const { warn } = buildLoggers('object');

export function getObjectValueList(object) {
  return Object.keys(object).map(typeKey => (object[typeKey]));
}

export function objectFromString(objectContext, stringNameSpace) {
  let namespace = 'objectContext';
  try {
    const namespaces = stringNameSpace.split('.');
    if (objectContext === undefined || objectContext === null) {
      throw new Error('objectContext is undefined');
    }
    let context = {
      ...objectContext,
    };
    for (const name of namespaces) {
      const nextContext = context[name];
      if (nextContext === undefined || nextContext === null) {
        namespace += '.undefined';
        throw new Error(namespace);
      }
      namespace += `.${name}`;
      context = context[name];
    }
    return context;
  } catch (err) {
    // warn('objectFromString()', err.message);
    return undefined;
  }
}
