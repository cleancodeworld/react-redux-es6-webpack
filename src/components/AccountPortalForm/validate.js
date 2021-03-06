import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isAlpha from 'validator/lib/isAlpha';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

const AccountPortalValidation = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 3 || values.username.length > 20) {
    errors.username = 'Username length should be between 3 and 20 characters';
  }

  if (!values.isAccepted) {
    errors.isAccepted = 'Required';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length < 3 || values.firstName.length > 20) {
    errors.firstName = 'First name length should be between 3 and 20 characters';
  } else if (!isAlpha(values.firstName)) {
    errors.firstName = 'First name can contain only alphabet';
  }

  if (!values.portalName) {
    errors.portalName = 'Required';
  } else if (values.portalName.length < 3) {
    errors.portalName = 'Portal name should be longer than 2 characters.';
  } else if (values.portalName.length > 30) {
    errors.portalName = 'Portal name can not be longer than 30 characters.';
  } else if (!isAlphanumeric(values.portalName + '')) {
    errors.portalName = 'Name should contain only letters and numbers';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length < 3 || values.lastName.length > 20) {
    errors.lastName = 'Username length should be between 3 and 20 characters';
  } else if (!isAlpha(values.lastName)) {
    errors.lastName = 'Last name can contain only alphabet';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }


  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!isNumeric(values.phone)) {
    errors.phone = 'Only numbers';
  } else if (values.phone.length < 6) {
    errors.phone = 'Min length 6 numbers';
  } else if (values.phone.length > 14) {
    errors.phone = 'Max length 14 numbers';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.confirmPassword && values.confirmPassword !== values.password) {
    errors.password = 'Does not match the entered confirm password';
  } else if (values.password.length < 3) {
    errors.password = 'Password length should be at least 3 characters';
  } else if (values.password.length > 100) {
    errors.password = 'Password must have at most 100 characters';
  }

  if (!values.termsOfUse) {
    errors.termsOfUse = 'Required';
  }

  if (!values.minutePrice) {
    errors.minutePrice = 'Required';
  } else if (!isNumeric(values.minutePrice)) {
    console.log('Only numbers');
    errors.minutePrice = 'Only numbers';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Does not match the entered password';
  }

  return errors;
};

export default AccountPortalValidation;
