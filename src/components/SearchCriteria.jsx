import React from 'react';

const SearchCriteria = () => {
  return (
    <div>
      this is the SearchCriteria()
    </div>
  );

};

export default SearchCriteria;

// /* eslint-disable jsx-a11y/label-has-associated-control,react/jsx-props-no-spreading */
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Form } from 'formik';
// import { createSelector } from 'reselect';
// import { loadSearchCriteriaConfig } from '../store/actions/searchCriteriaActions';
// import JsonRenderer from './CMS/JsonRenderer';
// import SearchCriteriaJson from './SearchCriteria.json';
// import ErrorBoundry from './CMS/ErrorBoundry';
// import { buildLoggers } from '../utils/log';
// import './SearchCriteria.scss';
// import DatePicker from './Form/DatePicker';
//
// const { log } = buildLoggers('SearchCriteria');
//
// const configSelector = createSelector(
//   (state) => state.SearchCriteria.config,
//   (config) => config,
// );
//
// const onSubmit = (values) => {
//   // same shape as initial values
//   log('onSubmit', { values });
// };
//
// // todo: replace with api validation when available
// // Async Validation
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const validate = (values) => sleep(1000).then(() => {
//   log('validate', { values });
//   const errors = {};
//   // if (!values.test || !values.test.length) {
//   //   errors.test = 'Nice try';
//   // }
//   log('validate', { errors });
//   return errors;
// });
//
// const initialValues = {
//   datePicker: new Date(),
// };
//
// function SearchCriteria() {
//   // const config = useSelector(configSelector);
//   // const dispatch = useDispatch();
//   //
//   // // Similar to componentDidMount and componentDidUpdate:
//   // useEffect(() => {
//   //   //
//   //   dispatch(loadSearchCriteriaConfig());
//   //
//   //   // Similar to componentWillUnmount
//   //   // return;
//   // });
//
//   return (
//     <div className="search-criteria">
//       <p>can you see this</p>
//     </div>
//   );
// }
//
// export default SearchCriteria;
//
// <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
//         {(formik) => {
//           const { values } = formik;
//           log('formik render', { values });
//
//           // todo: re-think this... this is very confusing
//           // currently being used to pass in specific props to specific components
//           const nodeConfig = {
//             RadioGroup: {
//               setFieldValue: formik.setFieldValue,
//             },
//             CheckboxGroup: {
//               setFieldValue: formik.setFieldValue,
//             },
//           };
//
//           return (
//             <Form className="u-v-flow-s">
//               <div>
//                 <DatePicker name="datePicker" />
//               </div>
//
//               <div>
//                 <button type="submit">Submit</button>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>

//
// // <ErrorBoundry>
// //                 <JsonRenderer json={SearchCriteriaJson} nodeConfig={nodeConfig} />
// //               </ErrorBoundry>
