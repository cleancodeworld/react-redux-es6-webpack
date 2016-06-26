import isURL from 'validator/lib/isURL';

const LessonFormValidation = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 100) {
    errors.title = 'Title cannot be longer than 100 characters.';
  }

  if (!values.thumbnail) {
    errors.thumbnail = 'Required';
  }
  if (!values.videoUrl) {
    errors.videoUrl = 'Required';
  } else if (!isURL(values.videoUrl)) {
    errors.videoUrl = 'Invalid Url';
  }

  return errors;
};

export default LessonFormValidation;
