import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  QuestionsList,
} from 'components';
import { load, isLoaded } from 'redux/modules/question/byPortal';
import {withCourses, withWishList, withCart, withUser} from 'hoc';
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isLoaded(state)) {
      promises.push(dispatch(load(state.portalCurrent.get('reqSubdomain'))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({coursesByPortal}) => ({
    order: coursesByPortal.get('order'),
  })
)

@withCourses
@withWishList
@withCart
@withUser

export default class QuestionsByPortal extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    user: PropTypes.object,
  };

  static pageHeader = {
  };

  render() {
    const {courses, order, user, cart, wishList} = this.props;
    return (
      <div>
        <Helmet title="Portal Courses"/>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <QuestionsList entities={courses}
                           order={order}
                           wishList={wishList}
                           cart={cart}
                           user={user}/>
          </div>
        </div>
      </div>
    );
  }
}
