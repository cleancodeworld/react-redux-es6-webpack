import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {
  CourseView,
} from 'components';
import { connect } from 'react-redux';
import {withWishList, withCart, withCourse} from 'hoc';

import { rate } from 'redux/modules/course/rate';
import { signup } from 'redux/modules/user/create';
import {showSignUpModal} from 'redux/modules/auth';


@connect(
  null,
  { rate, signup, showSignUpModal }
)
@withCart
@withWishList
@withCourse
export default class CourseViewContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    course: PropTypes.object,
    rate: PropTypes.func,
    showSignUpModal: PropTypes.func,
    params: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
  };

  static pageHeader = {
    boldTitle: 'View Course'
  }

  render() {
    const {params: {courseName}, course, wishList, cart} = this.props;
    return (
      <div>
        <Helmet title={course.get('name')}/>
        <CourseView course={course}
                    isWishListItem={!!wishList.entities.get(courseName)}
                    isCartItem={!!cart.entities.get(courseName)}
                    addToWishList={wishList.addToWishList}
                    removeFromWishList={wishList.removeFromWishList}
                    showSignUpModal={this.props.showSignUpModal}
                    addToCart={cart.addToCart}
                    removeFromCart={cart.removeFromCart}
                    onRate={(rateValue)=> this.props.rate({rate: rateValue, courseId: course.get('id')})}/>
      </div>
    );
  }
}
