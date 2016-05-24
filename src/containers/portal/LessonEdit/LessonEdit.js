import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { LessonForm } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
import { editLesson } from 'redux/modules/lesson/edit';
import {withLesson, withCourse} from 'hoc';

@connect(
  null,
  { editLesson }
)

@withCourse
@withLesson

export default class LessonEdit extends Component {
  static propTypes = {
    lesson: PropTypes.object,
    course: PropTypes.object,
    editLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    saved: false
  }

  render() {
    const {params: { courseName, lessonName }, lesson, course} = this.props;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
      { url: '/author/course/' + courseName + '/lesson/list', name: 'Lessons' },
    ];
    return (
      <div>
        <Helmet title={`Edit Lesson: ${lesson.get('title')}`}/>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <LessonForm initialValues={lesson.toJS()}
                          onSubmit={ model => this.props.editLesson(model, lesson.get('courseId'), courseName, lessonName).then(()=>this.setState({saved: true}))}
                          submitStatus={this.state.saved}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
