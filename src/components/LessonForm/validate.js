import isURL from 'validator/lib/isURL';

const LessonFormValidation = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 100) {
    errors.title = 'Title cannot be longer than 100 characters.';
  } else if (values.title.length < 2) {
    errors.title = 'Title cannot be less than 2 characters.';
  } else if (!/^[a-z0-9\s]+$/i.test(values.title)) {
    errors.title = 'You can use only alphabets, numbers and spaces in title.';
  }

  if (values.thumbnail && values.thumbnail.length && values.thumbnail[0].name) {
    const file = values.thumbnail[0].name.toLowerCase();
    if (file.indexOf('.jpg') === -1 && file.indexOf('.png') === -1 && file.indexOf('.jpeg') === -1 && file.indexOf('.gif') === -1) {
      errors.thumbnail = 'Make sure to upload a JPG, GIF, or PNG file and try again.';
    }
  }
  if (!values.videoUrl) {
    errors.videoUrl = 'Required';
  } else if (!isURL(values.videoUrl)) {
    errors.videoUrl = 'Invalid Url';
  }

  const content = values.content && values.content.replace(/<(?:.|\n)*?>/gm, '') || '';
  if (!content) {
    errors.content = 'Content is missing';
  } else if (content.length > 30000) {
    errors.content = 'Content can not be longer than 30000 characters.';
  }

  return errors;
};

export default LessonFormValidation;
