import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { LessonForm } from 'components';
import { editLesson } from 'redux/modules/lessons/edit';
import { load as loadLesson } from 'redux/modules/lessons/edit';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    const promises = [];
    if (params.lessonName) {
      promises.push(dispatch(loadLesson(params.lessonName)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ lessonEdit: state.lessonEdit }),
  { editLesson }
)
export default class LessonEdit extends Component {
  static propTypes = {
    lessonEdit: PropTypes.object,
    editLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  render() {
    const {courseName, lessonName} = this.props.params;
    const {lessonEdit} = this.props;
    let lesson = lessonEdit.get('lesson');
    if (typeof lesson.toJS !== 'undefined') {
      lesson = lesson.toJS();
    }
    return (
      <div>
        <LessonForm initialValues={lesson} onSubmit={ model => this.props.editLesson(model, lesson.courseId, courseName, lessonName)} />
      </div>
    );
  }
}
