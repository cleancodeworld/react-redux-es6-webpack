export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/course/LOAD';
export const LOAD_SUCCESS = 'knexpert/course/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/course/LOAD_FAIL';

import { LIST_SUCCESS } from './list';
import { CREATE_SUCCESS } from './create';
import { EDIT_SUCCESS } from './edit';
import { PUBLIC_LIST_SUCCESS } from './publiclist';
import {
  LOAD_SUCCESS as LOAD_LESSONS_SUCCESS
} from './../lesson/loaded';
import {ADD_SUCCESS as ADD_LESSON_SUCCESS} from './../lesson/create';
import {
  EDIT_SUCCESS as EDIT_LESSON_SUCCESS,
  LOAD_SUCCESS as LOAD_LESSON_SUCCESS,
} from './../lesson/edit';
import {REMOVE_SUCCESS as REMOVE_LESSON_SUCCESS} from './../lesson/remove';

import {
  LOAD_SUCCESS as LOAD_PRICE_SUCCESS,
  EDIT_SUCCESS as EDIT_PRICE_SUCCESS,
} from './price';

import {
  ADD_TO_WISH_LIST_SUCCESS,
  ADD_TO_WISH_LIST_FAIL,
} from './wish-list';

import Immutable from 'immutable';
import {
  courses as coursesNormalize,
  lessons as lessonsNormalize,
  coursesPublic as publicCoursesNormalize,
} from 'utils/normalize';

const initialState = Immutable.fromJS({
  wishList: {
    order: [],
    entities: {}
  },
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
        const course = action.result.data;
        map.mergeIn(['entities', course.slug], Immutable.fromJS(course));
      });
    case EDIT_SUCCESS:
      return state.withMutations(map=> {
        const { updatedCourse } = action.result.data;
        map.mergeIn(['entities', updatedCourse.slug], Immutable.fromJS(updatedCourse));
      });
    case LIST_SUCCESS:
      return state.withMutations(map=> {
        const courses = coursesNormalize(action.result.data.courses);
        map.merge(courses);
      });
    case PUBLIC_LIST_SUCCESS:
      return state.withMutations(map=> {
        const courses = publicCoursesNormalize(action.result.data.data.courses);  // temporary data.data
        map.merge(courses);
      });
    case LOAD_LESSONS_SUCCESS:
      return state.withMutations(map => {
        const {courseName} = action.data;
        const lessons = lessonsNormalize(action.result.data.lessons);
        map.mergeIn(['entities', courseName, 'lessons'], Immutable.fromJS(lessons));
      });
    case LOAD_LESSON_SUCCESS:
      return state.withMutations(map => {
        const {courseName, lessonName} = action.data;
        const lesson = action.result;
        map.mergeIn(['entities', courseName, 'lessons', 'entities', lessonName], Immutable.fromJS(lesson));
      });
    case ADD_LESSON_SUCCESS:
      return state.withMutations(map => {
        const {courseName} = action.data;
        const {createdLesson} = action.result;
        map.mergeIn(['entities', courseName, 'lessons', 'entities', createdLesson.slug], Immutable.fromJS(createdLesson));
        map.updateIn(['entities', courseName, 'lessons', 'order'], array=> array ? array.push(createdLesson.slug) : [createdLesson.slug]);
      });
    case EDIT_LESSON_SUCCESS:
      return state.withMutations(map => {
        const {courseName} = action.data;
        const {updatedLesson} = action.result;
        map.mergeIn(['entities', courseName, 'lessons', 'entities', updatedLesson.slug], Immutable.fromJS(updatedLesson));
      });
    case REMOVE_LESSON_SUCCESS:
      return state.withMutations(map => {
        const {courseName, lessonName} = action.data;
        map.removeIn(['entities', courseName, 'lessons', 'entities', lessonName]);
        map.updateIn(['entities', courseName, 'lessons', 'order'], array=>array.filter((lesson)=> lesson !== lessonName));
      });
    case CREATE_SUCCESS:
      return state.withMutations(map=> {
        const { createdCourse } = action.result.data;
        map.mergeIn(['entities', createdCourse.slug], createdCourse);
        map.update('order', array=>array.push(createdCourse.slug));
      });
    case LOAD_PRICE_SUCCESS:
      return state.withMutations(map=> {
        const course = action.result.data;
        const {courseName} = action.data;
        map.mergeIn(['entities', courseName, 'price'], course);
      });
    case EDIT_PRICE_SUCCESS:
      return state.withMutations(map=> {
        const {updatedPrice} = action.result.data;
        const {courseName} = action.data;
        map.mergeIn(['entities', courseName, 'price'], updatedPrice);
      });
    case ADD_TO_WISH_LIST_FAIL:
    case ADD_TO_WISH_LIST_SUCCESS:
      return state.withMutations(map=> {
        const {courseName} = action.data;
        map.updateIn(['wishList', 'order'], array=>array.push(courseName));
        map.setIn(['wishList', 'entities', courseName], true);
      });
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
  return globalState.courseLoaded && globalState.courseLoaded.getIn(['entities', courseName]);
}
