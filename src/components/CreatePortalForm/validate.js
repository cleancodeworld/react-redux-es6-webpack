import isAlphanumeric from 'validator/lib/isAlphanumeric';
const CreatePortalValidation = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.portalName.length < 3) {
    errors.name = 'Name should be longer than 2 characters.';
  } else if (values.name.length > 30) {
    errors.name = 'Name can not be longer than 30 characters.';
  } else if (!isAlphanumeric(values.name + '')) {
    errors.name = 'Name should contain only letters and numbers';
  }

  if (values.description && values.description.length > 200) {
    errors.description = 'Portal description cannot be longer than 200 characters.';
  }

  if (!values.isAccepted) {
    errors.isAccepted = 'You must accept to continue';
  }

  return errors;
};

export default CreatePortalValidation;
