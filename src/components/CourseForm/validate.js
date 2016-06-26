import isNumeric from 'validator/lib/isNumeric';

const CourseFormValidate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title > 100) {
    errors.title = 'Title cannot be longer than 100 characters.';
  }
  if (!values.subtitle) {
    errors.subtitle = 'Required';
  } else if (values.subtitle > 150) {
    errors.subtitle = 'Title cannot be longer than 150 characters.';
  }
  if (!values.thumbnail) {
    errors.thumbnail = 'Required';
  }
  if (!values.duration) {
    errors.duration = 'Required';
  } else if (!isNumeric(values.duration + '')) {
    errors.duration = 'Only Numbers';
  } else if (parseInt(values.duration, 10) > 100000) {
    errors.duration = 'Duration must be less than 100000';
  }
  return errors;
};

export default CourseFormValidate;
