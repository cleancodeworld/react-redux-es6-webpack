import React from 'react';
import {Link} from 'react-router';

const CartCourseList = ({entities, order, cart})=> {
  return (
    <div className="panel panel-flat">
      <div className="panel-body">
        <div className="content-group">
          <h6 className="text-semibold no-margin">1 Courses in Cart</h6>
        </div>
        <ul className="media-list">
          {
            order.map(courseName => {
              const course = entities.get(courseName);
              let courseImage = course.get('thumbnail');
              if (!courseImage) {
                courseImage = '/assets/images/placeholder.jpg';
              }
              return (
                <li className="media" key={course.get('id')}>
                  <div className="media-left">
                    <img src={courseImage} alt="" style={{width: '100px', height: 'auto'}}/>
                  </div>
                  <div className="media-body">
                    <div className="media-heading">
                      <Link to={`/course/${course.get('slug')}`} className="text-default">
                        <h5 className="panel-title">{course.get('name')}</h5>
                      </Link>
                    </div>
                    {`${course.getIn(['author', 'firstName'])} ${course.getIn(['author', 'lastName'])}`}
                  </div>
                  <div className="media-right mt-20 width-200 text-right">
                    <div className="row">
                      <div className="col-md-8">
                        <a href="#" className="legitRipple display-block" onClick={() => cart.removeFromCart(course)}>Remove</a>
                      </div>
                      <div className="col-md-4">
                        <b>{
                          course.getIn(['coursePrice', 'price']) ?
                          `${course.getIn(['coursePrice', 'currency'])} ${course.getIn(['coursePrice', 'price'])}`
                          :
                          'Free'
                        }</b>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
            /* <CourseListItem addToWishList={wishList.addToWishList}
                                removeFromWishList={wishList.removeFromWishList}
                                isWishListItem={!!wishList.entities.get(courseName)}
                                addToCart={cart.addToCart}
                                removeFromCart={cart.removeFromCart}
                                isCartItem={!!cart.entities.get(courseName)}
                                key={course.get('id')}
                                course={course}
                                onClickLoginRequiredLink={this.onClickLoginRequiredLink}
                                myCourses={myCourses}/> */
          }
        </ul>
      </div>
    </div>
  );
};

export default CartCourseList;
