import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  CourseList,
} from 'components';
import {withCourses, withWishList, withCart} from 'hoc';

@connect(
  ({wishList}) => ({
    order: wishList.get('order'),
  })
)
@withCourses
@withWishList
@withCart
export default class WishList extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const {courses, order} = this.props;
    return (
      <div className="page-container">
        <div className="content-wrapper">
          <Helmet title="My Wish List"/>
          <div className="content-group">
            <h6 className="text-semibold">My wish list </h6>
          </div>
          <CourseList entities={courses} order={order}/>
        </div>
      </div>
    );
  }
}
