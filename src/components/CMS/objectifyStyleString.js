/**
 * objectifyStyleString
 * - parse a commonly found inline style string into a object that is react friendly
 *
 * @param {string} styleString - a semi-colon delimited string
 *
 * @version 0.0.1
 * @author [Justin Gow](https://github.com/jaegow)
 */
const objectifyStyleString = (styleString) => styleString.split(';')
  .filter((style) => style.split(':')[0] && style.split(':')[1])
  .map((style) => [
    style.split(':')[0].trim().replace(/-./g, (c) => c.substr(1).toUpperCase()),
    style.split(':').slice(1).join(':').trim(),
  ])
  .reduce((styleObj, style) => ({
    ...styleObj,
    [style[0]]: style[1],
  }), {});

export default objectifyStyleString;
