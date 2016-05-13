import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';

import userCreate from './user/create';
import userVerify from './user/verify';
import auth from './auth';
import portal from './portal';
import passwordReset from './password/reset';
import passwordForget from './password/forget';
import portalCurrent from './portal/current';
import courseLoaded from './course/loaded';

import AccountPortalValidation from 'components/AccountPortalForm/validate';
import LoginFormValidation from 'components/LoginForm/validate';
import CreatePortalValidation from 'components/CreatePortalForm/validate';
import CourseFormValidation from 'components/CourseForm/validate';
import LessonFormValidation from 'components/LessonForm/validate';
import PasswordResetFormValidation from 'components/PasswordResetForm/validate';
import PasswordForgetFormValidation from 'components/PasswordForgetForm/validate';

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
    LessonForm: LessonFormValidation,
    PasswordResetForm: PasswordResetFormValidation,
    PasswordForgetForm: PasswordForgetFormValidation,
  }),
  courseLoaded,
  auth,
  portal,
  passwordReset,
  passwordForget,
  portalCurrent,
});
