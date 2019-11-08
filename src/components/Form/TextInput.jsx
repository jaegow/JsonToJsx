/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useField } from 'formik';
import uniqueId from 'lodash/uniqueId';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
// import { buildLoggers } from '../../utils/log';
// const { log } = buildLoggers('TextInput');

const TextInput = ({ label, placeholder, success, ...props }) => {
  const [id] = useState(() => uniqueId('text-input-id-'));
  const [field, meta] = useField(props);

  // log('render()', { field, meta });

  let validationClass = '';
  if (meta.touched) validationClass = !meta.error ? 'is-success' : 'is-danger';

  return (
    <div className="field">
      <label htmlFor={id}><span>{label}</span></label>
      <input
        type="text"
        id={id}
        className={validationClass}
        name={field.name}
        placeholder={placeholder}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
      />
      <ErrorMessage
        touched={meta.touched}
        error={meta.error}
      />
      <SuccessMessage
        touched={meta.touched}
        error={meta.error}
        message={success}
      />
    </div>
  );
};

export default TextInput;

// const [field, meta] = useField(props);

// Formik field values
// name: string - The name of the field
// checked?: boolean - Whether or not the input is checked, this is only defined if useField is passed an object with a name, type: "checkbox" or type: radio.
// onBlur: () => void; - A blur event handler. Necessary for the touched value to be properly set
// onChange: (e: React.ChangeEvent<any>) => void - A change event handler
// value: any - The field's value (plucked out of values) or, if it is a checkbox or radio input, then potentially the value passed into useField.
// multiple?: boolean - Whether or not the multiple values can be selected. This is only ever defined when useField is passed an object with multiple: true
// const { name, checked, onBlur, onChange, value, multiple} = field;

// Formik meta values
// error: string - The field's error message (plucked out of errors)
// initialError: string - The field's initial error if the field is present in initialErrors (plucked out of initialErrors)
// initialTouched: boolean - The field's initial value if the field is present in initialTouched (plucked out of initialTouched)
// initialValue: any - The field's initial value if the field is given a value in initialValues (plucked out of initialValues)
// touched: boolean - Whether the field has been visited (plucked out of touched)
// value: any - The field's value (plucked out of values)
// const {error, initialError, initialTouched, initialValue, touched, value} = meta;
