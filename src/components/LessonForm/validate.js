import isURL from 'validator/lib/isURL';

const LessonFormValidation = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 100) {
    errors.title = 'Title cannot be longer than 100 characters.';
  }
  if (values.thumbnail && values.thumbnail.length && values.thumbnail[0].name) {
    const file = values.thumbnail[0].name.toLowerCase();
    if (file.indexOf('.jpg') === -1 && file.indexOf('.png') === -1 && file.indexOf('.jpeg') === -1 && file.indexOf('.gif') === -1) {
      errors.thumbnail = 'only images allowed';
    }
  }
  if (!values.videoUrl) {
    errors.videoUrl = 'Required';
  } else if (!isURL(values.videoUrl)) {
    errors.videoUrl = 'Invalid Url';
  }

  return errors;
};

export default LessonFormValidation;
