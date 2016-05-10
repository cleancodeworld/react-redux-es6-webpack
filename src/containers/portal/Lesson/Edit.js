import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { LessonForm } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
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
  state => ({ lessonEdit: state.lessonEdit, lessons: state.lessons, courseEdit: state.courseEdit }),
  { editLesson }
)
export default class LessonEdit extends Component {
  static propTypes = {
    lessonEdit: PropTypes.object,
    lessons: PropTypes.object,
    courseEdit: PropTypes.object,
    editLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  render() {
    const {courseName, lessonName} = this.props.params;
    const {lessonEdit, lessons, courseEdit} = this.props;
    const course = courseEdit.get('course');
    const submitStatus = lessons.get('submitSuccess');
    let lesson = lessonEdit.get('lesson');
    if (typeof lesson.toJS !== 'undefined') {
      lesson = lesson.toJS();
    }
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
      { url: '/author/course/' + courseName + '/lesson/list', name: 'Lessons' },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <LessonForm initialValues={lesson} submitStatus={submitStatus} onSubmit={ model => this.props.editLesson(model, lesson.courseId, courseName, lessonName)} />
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
