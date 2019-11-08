import objectifyStyleString from './objectifyStyleString';
import { buildLoggers } from '../../utils/log';

const { error } = buildLoggers('reactifyJSonDataProps');

/**
 * reactifyJSonDataProps
 * - parse a json object to return safe to use props for react
 *
 * @param {object} data - a json object
 *
 * @version 0.0.1
 * @author [Justin Gow](https://github.com/jaegow)
 */
// todo: add full support for react props
const reactifyJSonDataProps = ({ data }) => {
  // remap property names to another name that react prefers
  const remapNames = {
    class: 'className',
    style: 'style',
  };

  return data && Object.keys(data)
    .reduce((obj, key) => {
      const propertyName = remapNames[key] ? remapNames[key] : key;
      if (propertyName === 'style') {
        let parsedStyles = {};
        try {
          parsedStyles = objectifyStyleString(data[key]);
        } catch (err) {
          error('reactifyProps() parsedStyles error', err);
        }
        // eslint-disable-next-line no-param-reassign
        obj[propertyName] = parsedStyles;
      } else {
        // eslint-disable-next-line no-param-reassign
        obj[propertyName] = data[key];
      }
      return obj;
    }, {});
};

export default reactifyJSonDataProps;
