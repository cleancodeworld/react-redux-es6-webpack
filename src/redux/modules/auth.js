export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOGIN = 'knexpert/auth/LOGIN';
export const LOGIN_SUCCESS = 'knexpert/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'knexpert/auth/LOGIN_FAIL';
export const LOGOUT = 'knexpert/auth/LOGOUT';
export const LOGOUT_SUCCESS = 'knexpert/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'knexpert/auth/LOGOUT_FAIL';
export const LOAD = 'knexpert/auth/LOAD';
export const LOAD_SUCCESS = 'knexpert/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/auth/LOAD_FAIL';
export const SHOW_SIGN_UP_MODAL = 'knexpert/auth/SHOW_SIGN_UP_MODAL';
export const HIDE_SIGN_UP_MODAL = 'knexpert/auth/HIDE_SIGN_UP_MODAL';
export const SHOW_LOG_IN_MODAL = 'knexpert/auth/SHOW_LOG_IN_MODAL';
export const HIDE_LOG_IN_MODAL = 'knexpert/auth/HIDE_LOG_IN_MODAL';
import {UPDATE_COVER_IMAGE_SUCCESS} from './user/edit';

import Immutable from 'immutable';
import { push } from 'react-router-redux';
import reactCookie from 'react-cookie';
import beautifyAndThrow from 'utils/errorBeautifier';

import config from 'config';
const cookieOpt = { path: '/', secure: false, httpOnly: false, domain: '.' + config.mainDomain };

const initialState = Immutable.fromJS({
  loaded: false,
  isShowSignUpModal: false,
  isShowLogInModal: false,
  user: null,
});

export default function auth(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state).withMutations(map=> {
        const sessionToken = reactCookie.load('sessionToken');
        const userId = reactCookie.load('userId');
        const username = reactCookie.load('username');
        if (sessionToken && userId && username && !map.getIn('user', 'sessionToken')) {
          const user = Immutable.fromJS({ sessionToken, userId, username });
          map.set('user', user);
        }
        map.set('loaded', false);
      });
    case LOGIN_SUCCESS:
      return state.withMutations((map)=> {
        const {model: {email} } = action.data;
        const {data} = action.result;
        // TODO: should get email from api
        const user = Immutable.fromJS(data).set('email', email);
        map.set('user', user);
      });
    case LOGIN_FAIL:
      return state.remove('user');
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      return state.withMutations((map)=> {
        map.remove('user');
        reactCookie.remove('sessionToken', cookieOpt);
        reactCookie.remove('userId', cookieOpt);
        reactCookie.remove('username', cookieOpt);
      });
    case LOAD_SUCCESS:
      return state.withMutations((map)=> {
        const { user } = action.result.data;
        if (!user.image) {
          user.image = 'http://placehold.it/150x150';
        }
        const me = Immutable.fromJS(user).set('sessionToken', reactCookie.load('sessionToken'));
        map.set('user', me);
        map.set('loaded', true);
      });
    case LOAD_FAIL:
      return state.set('loaded', true);
    case UPDATE_COVER_IMAGE_SUCCESS:
      return state.setIn(['user', 'image'], action.data.image);
    case SHOW_SIGN_UP_MODAL:
      return state.set('isShowSignUpModal', true);
    case HIDE_SIGN_UP_MODAL:
      return state.set('isShowSignUpModal', false);
    case SHOW_LOG_IN_MODAL:
      return state.set('isShowLogInModal', true);
    case HIDE_LOG_IN_MODAL:
      return state.set('isShowLogInModal', false);
    case '@@router/LOCATION_CHANGE':
      return state.withMutations(map=> {
        map.set('isShowLogInModal', false);
        map.set('isShowSignUpModal', false);
      });
    case LOGIN:
    default:
      return state;
  }
}

export function isAuthenticated(globalState) {
  return globalState.auth && globalState.auth.getIn(['user', 'sessionToken']);
}

export function login(model) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post(`/api/v1/login`, { data: model }),
    data: {
      model
    }
  };
}

export function silentLogin(model) {
  return {
    types: [LOGIN, LOGIN, LOGIN],
    promise: (client) => client.post(`/api/v1/login`, { data: model }),
    data: {
      model
    }
  };
}

export function userLogin(model, continueTo, portalName) {
  return dispatch => {
    return dispatch(
      login(model))
      .then((res)=> {
        const {sessionToken, username, userId} = res.data;
        if (model.remember) {
          cookieOpt.maxAge = 60 * 60 * 24 * 42;
        } else {
          cookieOpt.maxAge = 60 * 60 * 24;
        }
        reactCookie.save('sessionToken', sessionToken, cookieOpt);
        reactCookie.save('userId', userId, cookieOpt);
        reactCookie.save('username', username, cookieOpt);
        if (portalName) {
          location.href = `//${portalName}.${config.mainDomain}`;
        } else if (continueTo) {
          return dispatch(push(continueTo));
        }
      })
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.get('loaded');
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/v1/users/me')
  };
}

export function logout() {
  return dispatch => {
    return dispatch({
      types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
      promise: (client) => client.post('/api/v1/logout')
    }).then(()=> {
      window.location.href = `${location.protocol}//${config.mainDomain}/login`;
    });
  };
}

export function showSignUpModal() {
  return {
    type: SHOW_SIGN_UP_MODAL,
  };
}


export function hideSignUpModal() {
  return {
    type: HIDE_SIGN_UP_MODAL,
  };
}

export function showLogInModal() {
  return {
    type: SHOW_LOG_IN_MODAL,
  };
}

export function hideLogInModal() {
  return {
    type: HIDE_LOG_IN_MODAL,
  };
}
