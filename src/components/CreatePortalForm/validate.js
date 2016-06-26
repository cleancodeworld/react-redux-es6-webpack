import isAlphanumeric from 'validator/lib/isAlphanumeric';
const CreatePortalValidation = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 100) {
    errors.name = 'Name cannot be longer than 100 characters.';
  } else if (!isAlphanumeric(values.name + '')) {
    errors.name = 'Name should contain only letters and numbers';
  }

  if (values.description && values.description.length > 200) {
    errors.name = 'Portal description cannot be longer than 200 characters.';
  }

  if (!values.isAccepted) {
    errors.isAccepted = 'You must accept to continue';
  }

  return errors;
};

export default CreatePortalValidation;
