export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/call/byId/LOAD';
export const LOAD_SUCCESS = 'knexpert/call/byId/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/call/byId/LOAD_FAIL';

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`api/v1/call/id/${id}`)
  };
}

export function isLoaded(globalState, id) {
  return globalState.callLoaded && globalState.callLoaded.getIn(['entities', id]);
}
