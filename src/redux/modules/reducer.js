import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';

import wishList from './wish-list';
import userVerify from './user/verify';
import auth from './auth';
import portalCurrent from './portal/current';
import courseLoaded from './course/loaded';
import categoriesLoaded from './categories/loaded';

export default combineReducers({
  wishList,
  userVerify,
  courseLoaded,
  auth,
  portalCurrent,
  routing: routerReducer,
  form: formReducer,
  reduxAsyncConnect,
  categoriesLoaded,
});
