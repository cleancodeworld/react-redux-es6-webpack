import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { LessonForm } from 'components';
import { connect } from 'react-redux';
import { addLesson, getCourse } from 'redux/modules/lessons/lessons';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    const promises = [];
    if (params.courseName) {
      promises.push(dispatch(getCourse(params.courseName)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ lessons: state.lessons }),
  { addLesson }
)
export default class LessonAdd extends Component {
  static propTypes = {
    lessons: PropTypes.object,
    addLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  render() {
    const {courseName} = this.props.params;
    const {lessons} = this.props;
    const course = lessons.get('course');
    return (
      <div>
        <LessonForm onSubmit={ model => this.props.addLesson(model, course.Id, courseName)} />
      </div>
    );
  }
}
