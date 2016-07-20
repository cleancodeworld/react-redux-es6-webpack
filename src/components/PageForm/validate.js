import matches from 'validator/lib/matches';

const LessonFormValidation = values => {
  const errors = {};
  const title = values.title && values.title.trim() || '';
  if (!title) {
    errors.title = 'Title is missing.';
  } else if (title.length > 150) {
    errors.title = 'Title cannot be longer than 150 characters.';
  } else if (title.length < 3) {
    errors.title = 'Title cannot be less than 3 characters.';
  } else if (!matches(title, /^[a-z0-9\s]+$/i)) {
    errors.title = 'Title can not contain special characters';
  }

  return errors;
};

export default LessonFormValidation;
