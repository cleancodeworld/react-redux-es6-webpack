import React, { Component, PropTypes } from 'react';
import {
  CourseListItem,
} from 'components';

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
    return order.count() ? (
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
    ) : (<div>
      <div className="content-group tab-content-bordered navbar-component">
        <div className="navbar navbar-default navbar-xs">
          <div className="navbar-collapse collapse">
            <div class="navbar-text h3">No courses yet</div>
          </div>
        </div>
      </div>
    </div> );
  }
}
