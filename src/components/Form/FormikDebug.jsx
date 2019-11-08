import React from 'react';

const FormikDebug = ({ touched, errors, values, isSubmitting }) => {
  return (
    <div style={{ margin: '1rem 0', background: '#f6f8fa', padding: '.5rem' }}>
      <strong>Formik Debug Panel</strong>
      <div>
        <code>errors:</code> {JSON.stringify(errors, null, 2)}
      </div>
      <div>
        <code>touched:</code> {JSON.stringify(touched, null, 2)}
      </div>
      <div>
        <code>values:</code> {JSON.stringify(values, null, 2)}
      </div>
      <div>
        <code>isSubmitting:</code> {JSON.stringify(isSubmitting, null, 2)}
      </div>
    </div>
  );
}

export default FormikDebug;
