import {SubmissionError} from 'redux-form';

export default function beautifyAndThrow(errorMessage) {
  let error = '';
  if (/^Struct:/.test(errorMessage)) {
    error = 'Validation failed for following fields: ';
    const failedFields = [];
    const validationErrors = errorMessage.match(/Field validation for "[a-zA-Z0-9]+" failed on the "[a-zA-Z]+" tag/g);
    validationErrors.forEach(validationError => {
      const field = validationError.replace(/Field validation for "([a-zA-Z0-9]+)" failed on the "[a-zA-Z]+" tag/, '$1');
      failedFields.push(field);
    });
    error += failedFields.join(', ');
  } else {
    error = 'Unexpected server error occurred';
  }
  throw new SubmissionError({ _error: error });
}
