import isNumeric from 'validator/lib/isNumeric';

const validate = values => {
  const errors = {};

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!isNumeric(values.phone)) {
    errors.phone = 'Only numbers';
  } else if (values.phone.length < 6) {
    errors.phone = 'Min length 6 numbers';
  } else if (values.phone.length > 14) {
    errors.phone = 'Max length 14 numbers';
  }
  return errors;
};

export default validate;
