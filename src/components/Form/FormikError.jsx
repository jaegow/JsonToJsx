import React from 'react';

const FormikError = ({ touched, error }) => (touched && error ? (<p className="help is-danger">{error}</p>) : null);

export default FormikError;
