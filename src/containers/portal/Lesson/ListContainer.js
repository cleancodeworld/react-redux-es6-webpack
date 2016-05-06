import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { LessonList } from 'components';
import { isLoaded, load as loadLessons } from 'redux/modules/lessons/lessons';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(loadLessons(params.courseName)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ lessons: state.lessons })
)
export default class LessonListContainer extends Component {
  static propTypes = {
    lessons: PropTypes.object,
    params: PropTypes.object.isRequired,
  };

  render() {
    const {courseName} = this.props.params;
    let lessons = this.props.lessons.get('lessons');
    if (typeof lessons.toJS !== 'undefined') {
      lessons = lessons.toJS();
    }
    return (
      <div>
        <LessonList lessons={lessons} courseName={courseName} />
      </div>
    );
  }
}
