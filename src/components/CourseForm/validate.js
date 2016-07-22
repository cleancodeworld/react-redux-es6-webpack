import isNumeric from 'validator/lib/isNumeric';
import matches from 'validator/lib/matches';

const CourseFormValidate = (values) => {
  const errors = {};
  const name = values.name && values.name.trim() || '';
  const subtitle = values.subtitle && values.subtitle.trim() || '';
  if (!name) {
    errors.name = 'Required';
  } else if (name.length > 100) {
    errors.name = 'Title cannot be longer than 100 characters.';
  } else if (name.length < 2) {
    errors.name = 'Title cannot be less than 2 characters.';
  } else if (!matches(name, /^[a-z0-9\s]+$/i)) {
    errors.name = 'You can use only alphabets, numbers and spaces in title.';
  }

  if (!subtitle) {
    errors.subtitle = 'Required';
  } else if (subtitle.length > 150) {
    errors.subtitle = 'Subtitle cannot be longer than 150 characters.';
  } else if (name.length < 2) {
    errors.subtitle = 'Subtitle cannot be less than 2 characters.';
  } else if (!matches(subtitle, /^[a-z0-9\s]+$/i)) {
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
