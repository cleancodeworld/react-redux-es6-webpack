export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/sitePage/LOAD';
export const LOAD_SUCCESS = 'knexpert/sitePage/ADD_TO_WISH_LIST_SUCCESS';
export const LOAD_FAIL = 'knexpert/sitePage/ADD_TO_WISH_LIST_FAIL';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map=> {
        const sitePage = action.result.data;
        map.set(sitePage.shortId, Immutable.fromJS(sitePage));
      });
    default:
      return state;
  }
}

export function load(sitePageId, sitePageName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/sitepage/${sitePageId}/${sitePageName}`),
  };
}

export function isLoaded(globalState, sitePageId) {
  return globalState.sitePage && globalState.sitePage.get(sitePageId);
}
