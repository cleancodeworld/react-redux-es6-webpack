import isEmpty from 'lodash/isEmpty';

const AccountPortalValidation = values => {
  const errors = {};
  if (values.paid && isEmpty(values.currency)) {
    errors.currency = 'Select currency';
  }
  if (values.paid && values.price === 0) {
    errors.price = 'Select price';
  }
  return errors;
};

export default AccountPortalValidation;
