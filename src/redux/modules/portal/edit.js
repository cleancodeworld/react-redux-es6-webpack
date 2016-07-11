export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const UPDATE_COVER_IMAGE = 'knexpert/portal/UPDATE_COVER_IMAGE';
export const UPDATE_COVER_IMAGE_SUCCESS = 'knexpert/portal/UPDATE_COVER_IMAGE_SUCCESS';
export const UPDATE_COVER_IMAGE_FAIL = 'knexpert/portal/UPDATE_COVER_IMAGE_FAIL';

export function updateCoverImage(portal, coverImage) {
  const portalName = portal.name;
  return {
    types: [UPDATE_COVER_IMAGE, UPDATE_COVER_IMAGE_SUCCESS, UPDATE_COVER_IMAGE_FAIL],
    promise: (client) => client.put(`/api/v1/portal/name/${portalName}`, { data: { ...portal, coverImage } }),
    data: {
      coverImage
    }
  };
}
