import React, { useState } from 'react';
import { useField } from 'formik';
import uniqueId from 'lodash/uniqueId';
import FormikError from './FormikError';
import FormikSuccess from './FormikSuccess';

const Select = ({ label, options, success, ...props }) => {
  const [id] = useState(() => uniqueId('select-input-id-'));
  const [field, meta] = useField(props);

  return (
    <div className="field--select">
      <label className="label" htmlFor={id}><span>{label}</span></label>
      <select id={id} name={field.name} onBlur={field.onBlur} onChange={field.onChange} value={field.value}>
        {
          options.map(({ text, value }) => (<option key={`${value}-${text}`} value={value}>{text}</option>))
        }
      </select>
      <FormikError touched={meta.touched} error={meta.error} />
      <FormikSuccess touched={meta.touched} error={meta.error} message={success} />
    </div>
  );
};

export default Select;
