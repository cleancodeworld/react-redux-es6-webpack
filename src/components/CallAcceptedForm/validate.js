const validate = values => {
  const errors = {};

  if (!values.selectedDate) {
    errors.selectedDate = 'Required';
  }
  return errors;
};

export default validate;
