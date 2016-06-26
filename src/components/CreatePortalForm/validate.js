import isAlphanumeric from 'validator/lib/isAlphanumeric';
const CreatePortalValidation = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 100) {
    errors.name = 'Name cannot be longer than 150 characters.';
  } else if (!isAlphanumeric(values.name + '')) {
    errors.name = 'Name should contain only letters and numbers';
  }

  if (!values.isAccepted) {
    errors.isAccepted = 'You must accept to continue';
  }

  return errors;
};

export default CreatePortalValidation;
