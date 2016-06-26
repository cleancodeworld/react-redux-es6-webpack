const LessonFormValidation = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 100) {
    errors.title = 'Title cannot be longer than 100 characters.';
  }

  return errors;
};

export default LessonFormValidation;
