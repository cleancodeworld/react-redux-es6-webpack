const validate = values => {
  const errors = {};

  if (!values.message) {
    errors.message = 'Required';
  } else if (values.message.length < 3) {
    errors.message = 'Message can not be less than 3 characters.';
  }
  if (!values.estimated) {
    errors.estimated = 'Required';
  }
  if (!(values.date1 && values.time1) && !(values.date2 && values.time2) && !(values.date3 && values.time3)) {
    errors.date1 = 'At least select 1 date & time';
    errors.date2 = 'At least select 1 date & time';
    errors.date3 = 'At least select 1 date & time';
    errors.time1 = 'At least select 1 date & time';
    errors.time2 = 'At least select 1 date & time';
    errors.time3 = 'At least select 1 date & time';
  }

  const content = values.content && values.content.replace(/<(?:.|\n)*?>/gm, '') || '';
  if (!content) {
    errors.content = 'Body is missing';
  } else if (content.length < 30) {
    errors.content = 'Body can not be less than 30 characters.';
  } else if (content.length > 30000) {
    errors.content = 'Body can not be longer than 30000 characters.';
  }
  return errors;
};

export default validate;
