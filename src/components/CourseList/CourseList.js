import React, { Component, PropTypes } from 'react';
import {
  CourseListItem,
  SignupModal,
} from 'components';
import { connect } from 'react-redux';
import { addToWishList, removeFromWishList } from 'redux/modules/wishList';
import { addToCart, removeFromCart } from 'redux/modules/cart';
import { signup } from 'redux/modules/user/create';

@connect(
  ({wishList, cart, auth}) => ({
    wishList: wishList.get('entities'),
    cart: cart.get('entities'),
    user: auth.get('user')
  }),
  { addToWishList, removeFromWishList, addToCart, removeFromCart, signup }
)
export default class CourseList extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    author: PropTypes.object,
    wishList: PropTypes.object,
    user: PropTypes.object,
    cart: PropTypes.object,
    addToWishList: PropTypes.func,
    removeFromWishList: PropTypes.func,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    categoryName: PropTypes.string,
    signup: PropTypes.func,
    myCourses: PropTypes.bool,
  };

  state = {
    signUpModalOpen: false,
    signUpSubmitting: false,
  }

  onCloseSignupModal = () => {
    this.setState({ signUpModalOpen: false, signUpSubmitting: this.state.signUpSubmitting });
  }

  onClickLoginRequiredLink = (ev) => {
    const {user} = this.props;
    if (!user || !user.get('sessionToken')) {
      ev.preventDefault();
      ev.stopPropagation();
      this.setState({ signUpModalOpen: true, signUpSubmitting: this.state.signUpSubmitting });
    }
  }

  onSignupFormSubmit = (model) => {
    this.setState({ signUpModalOpen: true, signUpSubmitting: true });
    return this.props.signup(model)
      .then(() => this.setState({ signUpModalOpen: false, signUpSubmitting: false }));
  }

  nameToSlug(name) {
    return name.replace(' ', '-');
  }

  render() {
    const { wishList, entities, order, categoryName, cart, myCourses, author } = this.props;
    const { signUpModalOpen, signUpSubmitting } = this.state;
    return (
      <div>
        <div className="row">
          {
            order && order.map ?
            order.map(courseName => {
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
                                  author={author}
                                  onClickLoginRequiredLink={this.onClickLoginRequiredLink}
                                  myCourses={myCourses}/>
                );
              }
              return '';
            })
            :
            ''
          }
        </div>
        <SignupModal
          show={signUpModalOpen}
          onHide={this.onCloseSignupModal}
          onSubmit={this.onSignupFormSubmit}
          submitting={signUpSubmitting}/>
      </div>
    );
  }
}
