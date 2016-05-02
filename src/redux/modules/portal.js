export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CHECK = 'knexpert/portal/CHECK';
export const CHECK_SUCCESS = 'knexpert/portal/CHECK_SUCCESS';
export const CHECK_FAIL = 'knexpert/portal/CHECK_FAIL';

const initialState = {
  loaded: false
};

export default function portal(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK:
      return {
        ...state,
        loading: true
      };
    case CHECK_SUCCESS:
      console.log(action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case CHECK_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isChecked(globalState) {
  return globalState.check && globalState.check.loaded;
}

export function check(slug) {
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.get(`/v1/portal/${slug}`)
  };
}
