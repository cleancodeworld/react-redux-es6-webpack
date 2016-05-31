import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  CourseList,

} from 'components';

import {showSignUpModal} from 'redux/modules/auth';

import {
  withCourses,
  withWishList,
  withCart,
  withUser} from 'hoc';


@withCourses
@withWishList
@withCart
@withUser
@connect(null, { showSignUpModal })

export default class Cart extends Component {

  static propTypes = {
    courses: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    user: PropTypes.object,
    order: PropTypes.object,
    showSignUpModal: PropTypes.func,
  };
  static pageHeader = {
    title: ' - Cart',
    boldTitle: 'User'
  }

  render() {
    const {courses, user, cart, wishList} = this.props;
    return (
      <div className="page-container">
        <Helmet title="Cart"/>
        <div className="content-wrapper">
          <div className="content-group">
            <h6 className="text-semibold">My Cart</h6>
          </div>
          <CourseList wishList={wishList} cart={cart} user={user} entities={courses} order={cart.order}
                      onSessionRequired={ ()=> this.props.showSignUpModal()}
          />
        </div>
      </div>
    );
  }
}
