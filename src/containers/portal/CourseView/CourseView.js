import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {
  CourseView,
} from 'components';
import { connect } from 'react-redux';


import {withWishList, withCart, withCourse, withMyCourses} from 'hoc';
import { create, edit } from 'redux/modules/course/rate';
import { signup } from 'redux/modules/user/create';
import {showSignUpModal} from 'redux/modules/auth';
import {add as addToMyCourses} from 'redux/modules/myCourses';

@connect(
  null,
  { create, edit, signup, showSignUpModal, addToMyCourses }
)
@withCart
@withWishList
@withMyCourses
@withCourse
export default class CourseViewContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    course: PropTypes.object,
    create: PropTypes.func,
    edit: PropTypes.func,
    showSignUpModal: PropTypes.func,
    addToMyCourses: PropTypes.func,
    params: PropTypes.object,
    myCourses: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
  };

  static pageHeader = {
    boldTitle: 'View Course'
  }

  render() {
    const {params: {courseName}, course, wishList, cart, myCourses} = this.props;
    return (
      <div>
        <Helmet title={course.get('name')}/>
        <CourseView course={course}
                    onCheckOutSuccess={(token)=> this.props.addToMyCourses(course, token.id)}
                    isWishListItem={!!wishList.entities.get(courseName)}
                    isCartItem={!!cart.entities.get(courseName)}
                    isMyCoursesItem={!!myCourses.entities.get(courseName)}
                    addToWishList={wishList.addToWishList}
                    removeFromWishList={wishList.removeFromWishList}
                    showSignUpModal={this.props.showSignUpModal}
                    addToCart={cart.addToCart}
                    removeFromCart={cart.removeFromCart}
                    isRated={course.get('isRated')}
                    onRateCreate={(rateValue)=> this.props.create({rate: rateValue, courseId: course.get('id')}, course.get('slug'))}
                    onRateEdit={(rateValue)=> this.props.edit({rate: rateValue, courseId: course.get('id')}, course.get('slug'))}/>
      </div>
    );
  }
}
