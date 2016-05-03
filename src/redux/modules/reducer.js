import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as formReducer } from 'redux-form';

import AccountPortalValidation from 'components/AccountPortalForm/validate';
import LoginFormValidate from 'components/LoginForm/validate';
import auth from './auth';
import portal from './portal';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form: formReducer.validation({
    AccountPortalForm: AccountPortalValidation,
    LoginForm: LoginFormValidate,
  }),
  auth,
  portal,
});
