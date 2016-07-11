import isNumeric from 'validator/lib/isNumeric';

const CourseFormValidate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 100) {
    errors.name = 'Title cannot be longer than 100 characters.';
  } else if (values.name.length < 5) {
    errors.name = 'Title cannot be less than 5 characters.';
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
  if (values.thumbnail && values.thumbnail.length && values.thumbnail[0].name) {
    const file = values.thumbnail[0].name.toLowerCase();
    if (file.indexOf('.jpg') === -1 && file.indexOf('.png') === -1 && file.indexOf('.jpeg') === -1 && file.indexOf('.gif') === -1) {
      errors.thumbnail = 'Make sure to upload a JPG, GIF, or PNG file and try again.';
    }
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
