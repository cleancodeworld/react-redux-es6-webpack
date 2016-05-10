import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { LessonForm } from 'components';
import { connect } from 'react-redux';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
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
    const submitStatus = lessons.get('submitSuccess');
    const initialValues = {
      title: '',
      thumbnail: '',
      description: '',
      content: '',
    };
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
              <LessonForm initialValues={initialValues} onSubmit={ model => this.props.addLesson(model, course.get('Id'), courseName)} submitStatus={submitStatus} />
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
