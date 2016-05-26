import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  CourseList,
} from 'components';

import {withCourses} from 'hoc';

@connect(
  ({cart}) => ({
    order: cart.get('order'),
  })
)
@withCourses
export default class Cart extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
  };
  static pageHeader = {
    title: ' - Cart',
    boldTitle: 'User'
  }

  render() {
    const {courses, order} = this.props;
    return (
      <div className="page-container">
        <Helmet title="Cart"/>
        <div className="content-wrapper">
          <div className="content-group">
            <h6 className="text-semibold">My Cart</h6>
          </div>
          <CourseList entities={courses} order={order}/>
        </div>
      </div>
    );
  }
}
