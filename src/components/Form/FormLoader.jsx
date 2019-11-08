import React from 'react';
import { Formik, Form } from 'formik';
import JsonRenderer from '../CMS/JsonRenderer';
import getInitialFormValuesFromJson from '../CMS/getInitialFormValuesFromJson';
import { buildLoggers } from '../../utils/log';

const { log } = buildLoggers('FormLoader');

const onSubmit = (values) => {
  // same shape as initial values
  log('onSubmit', { values });
};

const FormLoader = ({ json, formComponents }) => {

  const initialValues = getInitialFormValuesFromJson(json, formComponents);

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          // const { values } = formik;
          // log('formik render', { values });

          // todo: clean this up... this feel gross
          const { setFieldValue } = formik;
          const propsDecorator = (jsonNode) => {
            const { object, type } = jsonNode;
            // log('propsDecorator()', { object, type });
            if (object === 'component') {
              // append formik.setFieldValue to props
              if (type === 'RadioGroup' || type === 'CheckboxGroup') return {setFieldValue};
            }
            return undefined;
          };

          return (
            <Form className="u-v-flow-s">
              <JsonRenderer json={json} components={formComponents} propsDecorator={propsDecorator} />
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormLoader;
