import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as formReducer } from 'redux-form';

import userCreate from './user/create';
import userVerify from './user/verify';
import auth from './auth';
import portal from './portal';

import AccountPortalValidation from 'components/AccountPortalForm/validate';
import LoginFormValidation from 'components/LoginForm/validate';
import CreatePortalValidation from 'components/CreatePortalForm/validate';
import CourseFormValidation from 'components/CourseForm/validate';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  userCreate,
  userVerify,
  form: formReducer.validation({
    AccountPortalForm: AccountPortalValidation,
    LoginForm: LoginFormValidation,
    CreatePortalForm: CreatePortalValidation,
    CourseForm: CourseFormValidation,
  }),
  auth,
  portal,
});
