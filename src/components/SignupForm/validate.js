import isAlpha from 'validator/lib/isAlpha';

const SignupValidation = values => {
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

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length < 3 || values.lastName.length > 20) {
    errors.lastName = 'Username length should be between 3 and 20 characters';
  } else if (!isAlpha(values.lastName)) {
    errors.lastName = 'Last name can contain only alphabet';
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
  } else if (values.password.length < 3) {
    errors.password = 'Password length should be at least 3 characters';
  } else if (values.password.length > 100) {
    errors.password = 'Password must have at most 100 characters';
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

export default SignupValidation;
