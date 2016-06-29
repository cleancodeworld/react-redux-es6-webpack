import isNumeric from 'validator/lib/isNumeric';
import isAlphanumeric from 'validator/lib/isAlphanumeric';

const AccountPortalValidation = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 3 && values.username.length < 20) {
    errors.username = 'Username length should be between 3 and 20 characters';
  }

  if (!values.isAccepted) {
    errors.isAccepted = 'Required';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (isNumeric(values.firstName)) {
    errors.firstName = 'First name should at least contain 1 letter';
  }

  if (!values.portalName) {
    errors.portalName = 'Required';
  } else if (values.portalName.length > 30) {
    errors.portalName = 'Portal name can not be longer than 30 characters.';
  } else if (!isAlphanumeric(values.portalName + '')) {
    errors.portalName = 'Name should contain only letters and numbers';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (isNumeric(values.lastName)) {
    errors.firstName = 'First name should at least contain 1 letter';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.confirmPassword && values.confirmPassword !== values.password) {
    errors.password = 'Does not match the entered confirm password';
  }

  if (!values.termsOfUse) {
    errors.termsOfUse = 'Required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Does not match the entered password';
  }
  return errors;
};

export default AccountPortalValidation;
