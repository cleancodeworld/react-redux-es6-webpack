import isEmpty from 'lodash/isEmpty';

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title is missing.';
  } else if (values.title.length > 150) {
    errors.title = 'Title cannot be longer than 150 characters.';
  } else if (values.title.length < 3) {
    errors.title = 'Title cannot be less than 3 characters.';
  }
  if (isEmpty(values.tags)) {
    errors.tags = 'Please enter at least one tag.';
  } else {
    for (let index = 0; index < values.tags.length; index++) {
      const tag = values.tags[index].name;
      if (tag.length > 10) {
        errors.tags = `Tag '${tag}' cannot be longer than 10 characters.`;
      }
    }
  }

  if (!values.content || values.content === '<p></p>') {
    errors.content = 'Body is missing';
  }
  return errors;
};

export default validate;
