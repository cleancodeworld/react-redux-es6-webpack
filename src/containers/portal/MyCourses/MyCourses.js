import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {showSignUpModal} from 'redux/modules/auth';

import {
  CourseList,
} from 'components';

import {withCourses, withWishList, withCart, withUser} from 'hoc';

@connect(
  ({myCourses}) => ({
    order: myCourses.get('order'),
  }), { showSignUpModal }
)
@withCourses
@withCart
@withWishList
@withUser

export default class MyCourses extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    showSignUpModal: PropTypes.func,
    user: PropTypes.object,
  };

  static pageHeader = {
    boldTitle: 'My Courses'
  };

  render() {
    const {courses, order, user, cart, wishList} = this.props;
    return (
      <div className="page-container">
        <Helmet title="My Courses"/>
        <div className="content-wrapper">
          <div className="content-group">
            <h6 className="text-semibold">My Courses</h6>
          </div>
          <CourseList entities={courses}
                      order={order}
                      wishList={wishList}
                      cart={cart}
                      onSessionRequired={ ()=> this.props.showSignUpModal()}
                      user={user}/>
        </div>
      </div>
    );
  }
}
