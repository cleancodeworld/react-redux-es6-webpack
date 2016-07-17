import isEmpty from 'lodash/isEmpty';
import matches from 'validator/lib/matches';

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title is missing.';
  } else if (values.title.length > 150) {
    errors.title = 'Title cannot be longer than 150 characters.';
  } else if (values.title.length < 3) {
    errors.title = 'Title cannot be less than 3 characters.';
  } else if (!matches(values.title, /^[a-z0-9 _-]+$/i)) {
    errors.title = 'Title can not contain special characters';
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
