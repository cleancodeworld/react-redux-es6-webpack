import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { PortalLayout } from '../index';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { load, isLoaded } from 'redux/modules/course/list';
import { addToWishList } from 'redux/modules/course/wish-list';
import {
  CourseListItem,
} from 'components';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isLoaded(state)) {
      promises.push(dispatch(load(state.auth.getIn(['user', 'username']))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({courseLoaded}) => ({
    entities: courseLoaded.get('entities'),
    wishList: courseLoaded.getIn(['wishList', 'entities']),
    order: courseLoaded.get('order'),
  }),
  { addToWishList }
)
export default class Home extends Component {
  static propTypes = {
    entities: PropTypes.object,
    wishList: PropTypes.object,
    addToWishList: PropTypes.func.isRequired,
    order: PropTypes.object,
  };

  render() {
    const {entities, order, wishList} = this.props;

    const breadcrumbs = [];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Course List">
          <Helmet title="Home"/>
          <div className="row">
            {order.map(course=> {
              return (<CourseListItem addToWishList={this.props.addToWishList} isWishListItem={!!wishList.get(course)} key={entities.get(course)}
                                      course={entities.get(course)}/>);
            })}
          </div>
        </PortalLayout>
      </div>
    );
  }
}
