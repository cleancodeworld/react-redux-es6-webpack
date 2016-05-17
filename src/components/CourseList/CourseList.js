import React, { Component, PropTypes } from 'react';
import {
  CourseListItem,
  SignupModal,
} from 'components';
import { connect } from 'react-redux';
import { addToWishList, removeFromWishList } from 'redux/modules/wishList';
import { addToCart, removeFromCart } from 'redux/modules/cart';

@connect(
  ({wishList, cart, auth}) => ({
    wishList: wishList.get('entities'),
    cart: cart.get('entities'),
    user: auth.get('user')
  }),
  { addToWishList, removeFromWishList, addToCart, removeFromCart }
)
export default class CourseList extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    user: PropTypes.object,
    cart: PropTypes.object,
    addToWishList: PropTypes.func,
    removeFromWishList: PropTypes.func,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    categoryName: PropTypes.string,
  };

  state = {
    signUpModalOpen: false,
  }

  onCloseSignupModal = () => {
    this.setState({ signUpModalOpen: false });
  }

  onClickLoginRequiredLink = (ev) => {
    const {user} = this.props;
    if (!user || !user.get('sessionToken')) {
      ev.preventDefault();
      ev.stopPropagation();
      this.setState({ signUpModalOpen: true });
    }
  }

  nameToSlug(name) {
    return name.replace(' ', '-');
  }

  render() {
    const { wishList, entities, order, categoryName, cart } = this.props;
    const { signUpModalOpen } = this.state;
    return (
      <div>
        <div className="row">
          {order.map(courseName => {
            const course = entities.get(courseName);
            if (!categoryName || this.nameToSlug(course.get('category')) === categoryName) {
              return (
                <CourseListItem addToWishList={this.props.addToWishList}
                                removeFromWishList={this.props.removeFromWishList}
                                isWishListItem={!!wishList.get(courseName)}
                                addToCart={this.props.addToCart}
                                removeFromCart={this.props.removeFromCart}
                                isCartItem={!!cart.get(courseName)}
                                key={course.get('id')}
                                course={course}
                                onClickLoginRequiredLink={this.onClickLoginRequiredLink}/>
              );
            }
            return '';
          })}
        </div>
        <SignupModal show={signUpModalOpen} onHide={this.onCloseSignupModal}/>
      </div>
    );
  }
}
