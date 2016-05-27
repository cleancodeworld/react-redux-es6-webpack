import isNumeric from 'validator/lib/isNumeric';

const CourseFormValidate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.subtitle) {
    errors.subtitle = 'Required';
  }
  if (!values.thumbnail) {
    errors.thumbnail = 'Required';
  }
  if (!values.duration) {
    errors.duration = 'Required';
  } else if (!isNumeric(values.duration + '')) {
    errors.duration = 'Only Numbers';
  }
  return errors;
};

export default CourseFormValidate;
