import {SubmissionError} from 'redux-form';

export default function beautifyAndThrow(errorMessage) {
  let error = '';
  if (errorMessage === 'invalid user or password') {
    error = 'Invalid email or password';
  } else if (/^Struct:/.test(errorMessage)) {
    error = 'Validation failed for the following fields: ';
    const failedFields = [];
    const validationErrors = errorMessage.match(/Field validation for "[a-zA-Z0-9]+" failed on the "[a-zA-Z]+" tag/g);
    validationErrors.forEach(validationError => {
      const field = validationError.replace(/Field validation for "([a-zA-Z0-9]+)" failed on the "[a-zA-Z]+" tag/, '$1');
      failedFields.push(field);
    });
    error += failedFields.join(', ');
  } else {
    error = errorMessage; // 'Unexpected error occurred on the server';
  }
  throw new SubmissionError({ _error: error });
}
