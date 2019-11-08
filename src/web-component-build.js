import React, { Suspense, lazy } from 'react';
import wrapReactComponents from './web-components/wrapReactComponents';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FormLoader from './components/Form/FormLoader';
import searchCriteriaJson from './components/FormTestData.json';
import './web-component-styles.scss';

// import CheckboxGroup from './components/Form/CheckboxGroup';
// import RadioGroup from './components/Form/RadioGroup';
// import Select from './components/Form/Select';
// import TextInput from './components/Form/TextInput';
// import DatePicker from './components/Form/DatePicker';

// import { buildLoggers } from './utils/log';
// const { log, warn } = buildLoggers('index.js');

// const formComponents = {
//   RadioGroup: import('./components/Form/RadioGroup'),
//   Select: import('./components/Form/Select'),
//   TextInput: import('./components/Form/TextInput'),
// };

const CheckboxGroup = lazy(() => import('./components/Form/CheckboxGroup'));
const RadioGroup = lazy(() => import('./components/Form/RadioGroup'));
const Select = lazy(() => import('./components/Form/Select'));
const TextInput = lazy(() => import('./components/Form/TextInput'));
const DatePicker = lazy(() => import('./components/Form/DatePicker'));

const formComponents = {
  CheckboxGroup,
  RadioGroup,
  Select,
  TextInput,
  DatePicker,
};

const Loading = () => (<p>Loading...</p>);

const TestFormComponent = () => (
  <Suspense fallback={<Loading />}>
    <FormLoader json={searchCriteriaJson} formComponents={formComponents} />
  </Suspense>
);

wrapReactComponents({
  'test-header': Header,
  'test-nav': Navigation,
  'test-form-component': TestFormComponent,
});
