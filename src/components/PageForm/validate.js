import matches from 'validator/lib/matches';

const LessonFormValidation = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is missing.';
  } else if (values.title.length > 150) {
    errors.title = 'Title cannot be longer than 150 characters.';
  } else if (values.title.length < 3) {
    errors.title = 'Title cannot be less than 3 characters.';
  } else if (!matches(values.title, /^[a-z0-9\s]+$/i)) {
    errors.title = 'Title can not contain special characters';
  }

  return errors;
};

export default LessonFormValidation;
