import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { replace } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import { load as loadCourse, isLoaded as isCourseLoaded } from 'redux/modules/course/loaded';

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isCourseLoaded(state, params.courseName)) {
      promises.push(dispatch(loadCourse(params.courseName)));
    }
    return Promise.all(promises);
  }
}])

@connect(({courseLoaded}, ownProps)=> ({
  course: courseLoaded.getIn(['entities', ownProps.params.courseName])
}), { replace })

export default class Course extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    course: PropTypes.object,
  }


  render() {
    const {course} = this.props;
    return course ? this.props.children : <span>Course not found</span>;
  }
}
