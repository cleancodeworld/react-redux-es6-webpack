import React, { Component, PropTypes } from 'react';
import {
  CourseListItem,
} from 'components';
import {withWishList, withCart, withUser} from 'hoc';

@withWishList
@withCart
@withUser

export default class CourseList extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    user: PropTypes.object,
    cart: PropTypes.object,
    activeCategory: PropTypes.object,
    myCourses: PropTypes.bool,
  };


  render() {
    const { wishList, entities, order, activeCategory, cart, myCourses } = this.props;
    return (
      <div>
        <div className="row">
          {
            order.map(courseName => {
              const course = entities.get(courseName);
              if (!activeCategory || course.get('category').indexOf(activeCategory.get('category')) > -1) {
                return (
                  <CourseListItem addToWishList={wishList.addToWishList}
                                  removeFromWishList={wishList.removeFromWishList}
                                  isWishListItem={!!wishList.entities.get(courseName)}
                                  addToCart={cart.addToCart}
                                  removeFromCart={cart.removeFromCart}
                                  isCartItem={!!cart.entities.get(courseName)}
                                  key={course.get('id')}
                                  course={course}
                                  onClickLoginRequiredLink={this.onClickLoginRequiredLink}
                                  myCourses={myCourses}/>
                );
              }
              return '';
            })
          }
        </div>
      </div>
    );
  }
}
