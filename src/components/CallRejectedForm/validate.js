const validate = values => {
  const errors = {};

  if (!values.rejectionMessage) {
    errors.rejectionMessage = 'Required';
  }
  return errors;
};

export default validate;
