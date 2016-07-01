import isNumeric from 'validator/lib/isNumeric';

const CourseFormValidate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 100) {
    errors.name = 'Title cannot be longer than 100 characters.';
  } else if (!/^[a-z0-9\s]+$/i.test(values.name)) {
    errors.name = 'You can use only alphabets, numbers and spaces in title.';
  }

  if (!values.subtitle) {
    errors.subtitle = 'Required';
  } else if (values.subtitle.length > 150) {
    errors.subtitle = 'Title cannot be longer than 150 characters.';
  } else if (!/^[a-z0-9\s]+$/i.test(values.subtitle)) {
    errors.subtitle = 'You can use only alphabets, numbers and spaces in subtitle.';
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
