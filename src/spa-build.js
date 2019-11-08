import React from 'react';
import ReactDOM from 'react-dom';
import SPA from './SPA';
import { buildLoggers } from './utils/log';
import './spa-build-styles.scss';

const { log } = buildLoggers('spa-build');

ReactDOM.render(<SPA />, document.getElementById('root'));
