import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { CourseAccountingForm } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';

@connect(
  ({courseLoaded}) => ({
    course: courseLoaded.get('course'),
  })
)
export default class CourseAccounting extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
  };

  render() {
    const {courseName} = this.props.params;
    const {course} = this.props;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
    ];
    let coursePrice = {};
    if (typeof coursePrice.toJS !== 'undefined') {
      coursePrice = coursePrice.toJS();
    }
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <Helmet title="Home"/>
              <CourseAccountingForm initialValues={coursePrice} />{/* onSubmit={model => this.props.edit(model, courseName)} */}
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
