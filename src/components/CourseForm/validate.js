const CourseFormValidate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.subtitle) {
    errors.subtitle = 'Required';
  }
  return errors;
};

export default CourseFormValidate;
