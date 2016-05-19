import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseView} from 'components';
import { connect } from 'react-redux';
import {
  PortalLayout,
} from '../index';

import { rate } from 'redux/modules/course/rate';
import { addToWishList, removeFromWishList } from 'redux/modules/wishList';
import { addToCart, removeFromCart } from 'redux/modules/cart';
import { signup } from 'redux/modules/user/create';

@connect(
  ({courseLoaded, portalCurrent, wishList, cart}, ownProps) => ({
    course: courseLoaded.getIn(['entities', ownProps.params.courseName]),
    portalId: portalCurrent.getIn(['meta', 'id']),
    wishList: wishList.get('entities'),
    cart: cart.get('entities'),
  }),
  { rate, addToWishList, removeFromWishList, addToCart, removeFromCart, signup }
)
export default class CourseViewContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    course: PropTypes.object,
    rate: PropTypes.func,
    params: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    isWishListItem: PropTypes.bool,
    addToWishList: PropTypes.func,
    removeFromWishList: PropTypes.func,
    isCartItem: PropTypes.bool,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
  };

  render() {
    const {params: {courseName}, course, wishList, cart} = this.props;
    const breadcrumbs = [
      { url: `/course/${course.get('slug')}`, name: course.get('name') }
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Create a Course">
          <Helmet title="Home"/>
          <CourseView course={course}
                      isWishListItem={!!wishList.get(courseName)}
                      isCartItem={!!cart.get(courseName)}
                      addToWishList={this.props.addToWishList}
                      removeFromWishList={this.props.removeFromWishList}
                      addToCart={this.props.addToCart}
                      removeFromCart={this.props.removeFromCart}
                      onRate={(rateValue)=> this.props.rate({rate: rateValue, courseId: course.get('id')})}/>
        </PortalLayout>
      </div>
    );
  }
}
