// import { buildLoggers } from '../utils/log';
// const { log } = buildLoggers('extractAttributes');

/**
 * Takes in a node attributes map and returns an object with camelCased properties and values
 * @param nodeMap
 * @returns {{}}
 */
const extractAttributes = ({ attributes }) => {
  if (!attributes) {
    return {};
  }

  const camelCasedAttributes = [...attributes].reduce((accumulator, { name, value }) => {
    const camelCasedKey = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    accumulator[camelCasedKey] = value;
    return accumulator;
  }, {});
  return camelCasedAttributes;
};

export default extractAttributes;
