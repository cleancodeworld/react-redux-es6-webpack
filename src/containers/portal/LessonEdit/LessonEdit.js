import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { LessonForm } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
import { editLesson } from 'redux/modules/lesson/edit';
import { load as loadLesson } from 'redux/modules/lesson/edit';

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
  ({courseLoaded, lessonEdit}, ownProps) => ({
    lessonEdit,
    course: courseLoaded.getIn(['entities', ownProps.params.courseName])
  }),
  { editLesson }
)
export default class LessonEdit extends Component {
  static propTypes = {
    lessonEdit: PropTypes.object,
    course: PropTypes.object,
    editLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    saved: false
  }

  render() {
    const {params: { courseName, lessonName }, lessonEdit, course} = this.props;
    const initialValues = lessonEdit.get('lesson') ? lessonEdit.get('lesson').toJS() : {};
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
              <LessonForm initialValues={initialValues}
                          onSubmit={ model => this.props.editLesson(model, initialValues.courseId, courseName, lessonName).then(()=>this.setState({saved: true}))}
                          submitStatus={this.state.saved}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
