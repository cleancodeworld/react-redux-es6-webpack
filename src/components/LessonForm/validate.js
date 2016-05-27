import isURL from 'validator/lib/isURL';

const LessonFormValidation = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
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
