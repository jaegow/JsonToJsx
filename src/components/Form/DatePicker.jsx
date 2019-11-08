import React from 'react';
import { useField } from 'formik';

const DatePicker = ({ label, options = [], setFieldValue, placeholder, success, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>this is not ready</div>
  );
};

export default DatePicker;
