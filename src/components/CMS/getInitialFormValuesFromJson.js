import { buildLoggers } from '../../utils/log';

const { log } = buildLoggers('getInitialFormValuesFromJson');

const getComponentNameProp = (nodes, components) => nodes.reduce((accumulator, currentNode) => {
  if (currentNode.object === 'component') {
    const componentExists = components[currentNode.type];
    if (componentExists) {
      const { name, value } = currentNode.data;
      if (name && value) {
        log({ name, value });
        accumulator[name] = value;
      }
    }
  }
  if (currentNode.nodes && currentNode.nodes.length) {
    const nested = getComponentNameProp(currentNode.nodes, components);
    // eslint-disable-next-line no-param-reassign
    accumulator = {
      ...nested,
      ...accumulator,
    }
  }
  return accumulator;
}, {});

const getInitialFormValuesFromJson = (json, components) => {
  if (!components || !json || !json.nodes) return null;
  return getComponentNameProp(json.nodes, components);
};

export default getInitialFormValuesFromJson;
