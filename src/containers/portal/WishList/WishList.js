import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {showSignUpModal} from 'redux/modules/auth';
import {
  CourseList,
} from 'components';
import {withCourses, withWishList, withCart, withUser} from 'hoc';

@connect(
  ({wishList}) => ({
    order: wishList.get('order'),
  }), { showSignUpModal }
)
@withCourses
@withWishList
@withCart
@withWishList
@withUser

export default class WishList extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    showSignUpModal: PropTypes.func,
    user: PropTypes.object,
  };

  render() {
    const {courses, order, wishList, cart, user} = this.props;
    return (
      <div className="page-container">
        <div className="content-wrapper">
          <Helmet title="My Wish List"/>
          <div className="content-group">
            <h6 className="text-semibold">My wish list </h6>
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
