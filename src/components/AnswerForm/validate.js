const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  const content = values.content && values.content.replace(/<(?:.|\n)*?>/gm, '') || '';
  if (!content) {
    errors.content = 'Body is missing';
  } else if (content.length < 30) {
    errors.content = 'Body can not be less than 30 characters.';
  } else if (content.length > 30000) {
    errors.content = 'Body can not be longer than 30000 characters.';
  }
  return errors;
};

export default validate;
