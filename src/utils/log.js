/* eslint-disable import/prefer-default-export,no-console */
const defaultFormatOptions = {
  delimiter: '.',
  pre: '[ ',
  post: ' ] --',
  color: '#34A39C',
};


const debug_element = document.getElementById('jg-debug');
const debug_hack = (message) => {
  if (debug_element) {
    const child = document.createElement('p');
    child.innerText = message;
    debug_element.appendChild(child);
  }
};

// todo: make into a isomorphic version
// const isNode = typeof process !== 'undefined' && process.release && process.release.name === 'node';
// const getColorArgs = (color, message) => [`%c ${message}`, `color: ${color}`];
const getColorArgs = (color, message) => [message];
// return isNode ? [chalk.hex(color).bold(message)] : [`%c ${message}`, `color: ${color}`];

const decorateArgs = ({
  context, pre, post, delimiter, color, args,
}) => {
  const lastArg = args.pop(); // message will always be the last item
  const namespace = `${pre}${[...context, ...args].join(delimiter)}${post}`;
  const colorArgs = getColorArgs(color, namespace);
  return [...colorArgs, lastArg];
};

// todo: look into https://www.npmjs.com/package/log4js
// todo: add a append context chaining method
export function buildLoggers(initialNameSpace) {
  const context = [initialNameSpace];

  return {
    log: (...args) => {
      const decoratedArgs = decorateArgs({
        ...defaultFormatOptions,
        color: '#34A39C',
        context,
        args,
      });
      console.log(...decoratedArgs);
      debug_hack(decoratedArgs.join(' '));
    },
    error: (...args) => {
      const decoratedArgs = decorateArgs({
        ...defaultFormatOptions,
        color: '#db4848',
        context,
        args,
      });
      console.error(...decoratedArgs);
      debug_hack(decoratedArgs.join(' '));
    },
    todo: (...args) => {
      const decoratedArgs = decorateArgs({
        ...defaultFormatOptions,
        color: '#3b8c43',
        pre: 'TODO: [ ',
        context,
        args,
      });
      console.log(...decoratedArgs);
      debug_hack(decoratedArgs.join(' '));
    },
    warn: (...args) => {
      const decoratedArgs = decorateArgs({
        ...defaultFormatOptions,
        color: '#FFE333',
        pre: '!! WARN: [ ',
        context,
        args,
      });
      console.log(...decoratedArgs);
      debug_hack(decoratedArgs.join(' '));
    },
  };
}
