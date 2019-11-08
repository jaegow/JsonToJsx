import React from 'react';

const SuccessMessage = ({ touched, error, message }) => (touched && !error && message ? (<p className="help is-success">{message}</p>) : null);

export default SuccessMessage;
