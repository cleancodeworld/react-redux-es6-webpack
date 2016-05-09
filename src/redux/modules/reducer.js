import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as formReducer } from 'redux-form';

import userCreate from './user/create';
import userVerify from './user/verify';
import courseCreate from './course/create';
import courseList from './course/list';
import courseEdit from './course/edit';
import auth from './auth';
import portal from './portal';
import lessons from './lessons/lessons';
import lessonEdit from './lessons/edit';
import passwordReset from './password/reset';
import passwordForget from './password/forget';
import portalCurrent from './portal/current';

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
  auth,
  portal,
  lessons,
  lessonEdit,
  courseCreate,
  courseList,
  courseEdit,
  passwordReset,
  passwordForget,
  portalCurrent,
});
