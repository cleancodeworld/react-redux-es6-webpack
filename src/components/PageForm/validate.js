const LessonFormValidation = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  return errors;
};

export default LessonFormValidation;
