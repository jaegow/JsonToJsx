import React, { useState } from 'react';
import { useField } from 'formik';
import uniqueId from 'lodash/uniqueId';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

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
      <ErrorMessage touched={meta.touched} error={meta.error} />
      <SuccessMessage touched={meta.touched} error={meta.error} message={success} />
    </div>
  );
};

export default Select;
