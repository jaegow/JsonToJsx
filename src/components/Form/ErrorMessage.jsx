import React from 'react';

const ErrorMessage = ({ touched, error }) => (touched && error ? (<p className="help is-danger">{error}</p>) : null);

export default ErrorMessage;
