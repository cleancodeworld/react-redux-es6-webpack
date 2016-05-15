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

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  userCreate,
  userVerify,
  courseLoaded,
  form: formReducer,
  auth,
  portal,
  passwordReset,
  passwordForget,
  portalCurrent,
});
