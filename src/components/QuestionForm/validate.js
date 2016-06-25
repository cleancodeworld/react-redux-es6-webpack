import isEmpty from 'lodash/isEmpty';

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title is missing';
  } else if (values.title && values.title.length < 150) {
    errors.title = 'Title cannot be longer than 150 characters.';
  }
  if (isEmpty(values.tags)) {
    errors.tags = 'Please enter at least one tag;';
  }

  if (!values.content) {
    errors.content = 'Body is missing';
  }
  return errors;
};

export default validate;
