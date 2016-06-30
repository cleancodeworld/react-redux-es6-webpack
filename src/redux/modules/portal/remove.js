export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const REMOVE = 'knexpert/portals/REMOVE';
export const REMOVE_SUCCESS = 'knexpert/portals/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'knexpert/portals/REMOVE_FAIL';

export function remove(portal) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.del(`/api/v1/portal/name/${portal.get('name')}`),
    data: {
      portal: portal.toJS()
    }
  };
}
