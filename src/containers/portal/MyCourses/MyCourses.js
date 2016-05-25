import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  CourseList,
} from 'components';

import {withCourses, withWishList, withCart, withMyCourses} from 'hoc';

@connect(
  ({myCourses}) => ({
    order: myCourses.get('order'),
  })
)
@withCourses
@withCart
@withWishList
@withMyCourses
export default class MyCourses extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
  };

  static pageHeader = {
    boldTitle: 'My Courses'
  };

  render() {
    const {courses, order} = this.props;
    return (
      <div className="page-container">
        <Helmet title="My Courses"/>
        <div className="content-wrapper">
          <div className="content-group">
            <h6 className="text-semibold">My Courses</h6>
          </div>
          <CourseList entities={courses} order={order} myCourses/>
        </div>
      </div>
    );
  }
}
