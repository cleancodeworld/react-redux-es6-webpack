import React, { Component, PropTypes } from 'react';
import { LessonForm } from 'components';
import { connect } from 'react-redux';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
import { add as addLesson } from 'redux/modules/lesson/create';

@connect(
  state => ({ lessons: state.courseLoaded }),
  { addLesson }
)
export default class LessonAdd extends Component {
  static propTypes = {
    lessons: PropTypes.object,
    addLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    saved: false
  }

  render() {
    const {courseName} = this.props.params;
    const {lessons} = this.props;
    const course = lessons.get('course');
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
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={` - course.get('name')`}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <LessonForm initialValues={initialValues}
                          onSubmit={ model => this.props.addLesson(model, course.get('Id'), courseName).then(()=> this.setState({saved: true}))}
                          submitStatus={this.state.saved}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
