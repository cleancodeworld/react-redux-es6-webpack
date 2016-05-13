export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/course/LOAD';
export const LOAD_SUCCESS = 'knexpert/course/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/course/LOAD_FAIL';

import Immutable from 'immutable';
import {courses as coursesNormalize} from 'utils/normalize';
import { LIST_SUCCESS } from './list';
import { CREATE_SUCCESS } from './create';
import { EDIT_SUCCESS } from './edit';
import {
  LOAD_SUCCESS as LOAD_PRICE_SUCCESS,
  EDIT_SUCCESS as EDIT_PRICE_SUCCESS,
} from './price';

const initialState = Immutable.fromJS({
  order: [],
  entities: {}
});

export default function courseLoad(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map=> {
        const course = action.result;
        map.mergeIn(['entities', course.slug], Immutable.fromJS(course));
      });
    case EDIT_SUCCESS:
      return state.withMutations(map=> {
        const { updatedCourse } = action.result;
        map.mergeIn(['entities', updatedCourse.slug], Immutable.fromJS(updatedCourse));
      });
    case LIST_SUCCESS:
      return state.withMutations(map=> {
        const courses = coursesNormalize(action.result.courses);
        map.merge(courses);
      });
    case CREATE_SUCCESS:
      return state.withMutations(map=> {
        const { createdCourse } = action.result;
        map.mergeIn(['entities', createdCourse.slug], createdCourse);
        map.update('order', array=>array.push(createdCourse.slug));
      });
    case LOAD_PRICE_SUCCESS:
      return state.withMutations(map=> {
        const course = action.result;
        const {courseName} = action.data;
        map.mergeIn(['entities', courseName, 'price'], course);
      });
    case EDIT_PRICE_SUCCESS:
      return state.withMutations(map=> {
        const {updatedPrice} = action.result;
        const {courseName} = action.data;
        map.mergeIn(['entities', courseName, 'price'], updatedPrice);
      });
    case LOAD_FAIL:
      return state.remove(action.data.courseName);
    case LOAD:
    default:
      return state;
  }
}

export function load(courseName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/course/name/${courseName}`),
    data: {
      courseName
    }
  };
}

export function isLoaded(globalState, courseName) {
  return !globalState.courseLoaded || globalState.courseLoaded && globalState.courseLoaded.get(courseName);
}

