import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  CourseList,
} from 'components';
import { load, isLoaded } from 'redux/modules/course/byPortal';
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

export default class CoursesByPortal extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    user: PropTypes.object,
  };

  static pageHeader = {
    title: ' - List',
    boldTitle: 'Courses'
  };

  render() {
    const {courses, order, user, cart, wishList} = this.props;
    return (
      <div>
        <Helmet title="Portal Courses"/>
        <div className="content-group">
          <Link to="/author/course/create" className="btn bg-blue">Create Course</Link>
        </div>
        <CourseList entities={courses}
                    order={order}
                    wishList={wishList}
                    cart={cart}
                    user={user}/>
      </div>
    );
  }
}
