import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { load, edit } from 'redux/modules/course/edit';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    const promises = [];
    promises.push(dispatch(load(params.courseName)));
    return Promise.all(promises);
  }
}])
@connect(
  ({courseEdit}) => ({
    course: courseEdit.get('course'),
    submitStatus: courseEdit.get('submitSuccess'),
  }),
  { edit }
)
export default class CourseEdit extends Component {

  static propTypes = {
    course: PropTypes.object.isRequired,
    edit: PropTypes.func,
    params: PropTypes.object.isRequired,
    submitStatus: PropTypes.bool,
  };

  render() {
    const {courseName} = this.props.params;
    const {submitStatus} = this.props;
    const course = this.props.course;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
    ];
    let courseValues = course;
    if (typeof courseValues.toJS !== 'undefined') {
      courseValues = courseValues.toJS();
    }
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <Helmet title="Home"/>
              <CourseForm initialValues={courseValues} submitStatus={submitStatus} onSubmit={model => this.props.edit(model, courseName)}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
