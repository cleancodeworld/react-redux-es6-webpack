import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseView} from 'components';
import { connect } from 'react-redux';
import {
  PortalLayout,
} from '../index';

import { rate } from 'redux/modules/course/rate';

@connect(
  ({courseLoaded, portalCurrent}, ownProps) => ({
    course: courseLoaded.getIn(['entities', ownProps.params.courseName]),
    portalId: portalCurrent.getIn(['meta', 'id']),
  }),
  { rate }
)
export default class CourseViewContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    course: PropTypes.object,
    rate: PropTypes.func,
  };

  render() {
    const {course} = this.props;
    const breadcrumbs = [
      { url: `/course/${course.get('slug')}`, name: course.get('name') }
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Create a Course">
          <Helmet title="Home"/>
          <CourseView course={course} onRate={(rateValue)=> this.props.rate({rate: rateValue, courseId: course.get('id')})}/>
        </PortalLayout>
      </div>
    );
  }
}
