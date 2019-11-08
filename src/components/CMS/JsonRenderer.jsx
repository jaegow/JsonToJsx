/* eslint-disable no-param-reassign,react/jsx-props-no-spreading */
import React, { memo } from 'react';
import reactifyJSonDataProps from './reactifyJSonDataProps';
import { buildLoggers } from '../../utils/log';

const { log, todo, error } = buildLoggers('JsonRenderer');

// used for rendering the bottom most content from elements & components
// this would normally be text content
const renderLeaves = (leaves, tier = 1) => {
  // log('renderLeaves()', { leaves });
  const textColletion = leaves.map(({ text }, index) => text);
  return textColletion.join('');
};

const buildRenderer = ({ components, propsDecorator }) => {
  // builds a tag that can be used by react
  const getJsxTag = ({ object, type }) => {
    // log('buildRenderer', 'getJsxTag', { components });
    // default as a div component
    let Tag;
    if (object === 'component') {
      const component = components[type];
      if (component) {
        Tag = component;
      } else {
        error('buildRenderer.getTag()', 'no component by type', { object, type });
      }
    } else if (object === 'element') {
      // log('getTag()', { object, type });
      // todo: would React.createElement be better here
      Tag = type;
    } else if (object === 'text') {
      // log('getTag()', { object, type });
      Tag = React.Fragment;
    }
    if (!Tag) error('buildRenderer.getTag()', '!Tag', { object, type });
    return Tag;
  };

  // used for rendering elements & components
  const renderNodes = (nodes, tier = 1) => nodes.map((node, index) => {
    const JsxElement = getJsxTag(node);
    // stop here if component does not exist
    if (!JsxElement) return null;

    let children;
    if (node.nodes && node.nodes.length) children = renderNodes(node.nodes, tier + 1);
    else if (node.leaves && node.leaves.length) children = renderLeaves(node.leaves, tier + 1);

    const key = `tree-${node.type}-${tier}-${index}`;
    const extraProps = propsDecorator && propsDecorator(node);

    const jsonDataProps = reactifyJSonDataProps(node);
    const props = {
      key,
      ...jsonDataProps,
      ...extraProps,
      children,
    };
    return <JsxElement {...props} />;
  });

  return {
    renderNodes,
    renderLeaves,
  };
};

const JsonRenderer = memo(({ json, components, propsDecorator }) => {
  // do nothing if json and components are not defined
  if (!json || !components) return null;

  const { nodes, leaves } = json;
  // do nothing if json is no good
  if (!nodes && !leaves) {
    error('render', 'json no good', { json });
    return null;
  }

  const renderer = buildRenderer({ components, propsDecorator });

  if (nodes.length) return renderer.renderNodes(nodes, 1);
  if (leaves.length) return renderer.renderLeaves(leaves, 1);

  return null;
});

export default JsonRenderer;
