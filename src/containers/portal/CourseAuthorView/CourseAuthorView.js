import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';

@connect(
  ({courseEdit}) => ({ course: courseEdit.get('course') }),
  null
)
export default class CourseAuthorView extends Component {

  static propTypes = {
    params: PropTypes.object,
    course: PropTypes.object,
  };

  render() {
    const {courseName} = this.props.params;
    const course = this.props.course;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <div className="panel panel-flat">
                <Helmet title="Home"/>
                <div className="panel-body">
                </div>
              </div>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
