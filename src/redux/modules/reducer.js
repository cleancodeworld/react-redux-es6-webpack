import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as formReducer} from 'redux-form';

import AccountPortalValidation from 'components/AccountPortalForm/validate';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form: formReducer.validation({
    AccountPortalForm: AccountPortalValidation,
  }),
});
