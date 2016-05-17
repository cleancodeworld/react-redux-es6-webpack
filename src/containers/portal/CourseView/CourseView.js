import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseView} from 'components';
import { connect } from 'react-redux';
import {
  PortalLayout,
} from '../index';

@connect(
  ({courseLoaded, portalCurrent}, ownProps) => ({
    course: courseLoaded.getIn(['entities', ownProps.params.courseName]),
    portalId: portalCurrent.getIn(['meta', 'id']),
  })
)
export default class CourseViewContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    course: PropTypes.object,
  };

  render() {
    const {course} = this.props;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Create a Course' }
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Create a Course">
          <Helmet title="Home"/>
          <CourseView course={course}/>
        </PortalLayout>
      </div>
    );
  }
}
