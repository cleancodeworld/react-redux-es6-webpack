import React, { Component, PropTypes } from 'react';
import {
  CourseListItem,
} from 'components';
import { connect } from 'react-redux';
import { addToWishList, removeFromWishList } from './../../redux/modules/wish-list';

@connect(
  ({wishList}) => ({
    wishList: wishList.get('entities'),
  }),
  { addToWishList, removeFromWishList }
)
export default class CourseList extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    addToWishList: PropTypes.func,
    removeFromWishList: PropTypes.func,
  };

  render() {
    const { wishList, entities, order} = this.props;
    return ( <div className="row">
      {order.map(course=>
        <CourseListItem addToWishList={this.props.addToWishList}
                        removeFromWishList={this.props.removeFromWishList}
                        isWishListItem={!!wishList.get(course)}
                        key={entities.get(course)}
                        course={entities.get(course)}/>
      )}
    </div>);
  }
}
