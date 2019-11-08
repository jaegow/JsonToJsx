import React from 'react';
import { useField } from 'formik';
import {DatePicker as KendoDatePicker} from '@progress/kendo-react-dateinputs';

const DatePicker = ({ label, options = [], setFieldValue, placeholder, success, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <KendoDatePicker
      name={field.name}
      placeholder={placeholder}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  );
};

export default DatePicker;
