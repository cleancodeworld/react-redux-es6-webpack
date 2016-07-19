import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { load as loadCourse, isLoaded as isCourseLoaded } from 'redux/modules/course/loaded';
import { load as loadRates, isLoaded as isCourseRatesLoaded } from 'redux/modules/course/rate';
import { isLoaded as isLessonsLoaded, load as loadLessons } from 'redux/modules/lesson/loaded';

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isCourseLoaded(state, params.courseName)) {
      promises.push(dispatch(loadCourse(params.courseName)));
    }
    if (!isLessonsLoaded(getState(), params.courseName)) {
      promises.push(dispatch(loadLessons(params.courseName)));
    }
    if (!isCourseRatesLoaded(getState(), params.courseName)) {
      promises.push(dispatch(loadRates(params.courseName, state.auth.getIn(['user', 'userId']))));
    }
    return Promise.all(promises);
  }
}])

export default class Course extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return this.props.children;
  }
}
