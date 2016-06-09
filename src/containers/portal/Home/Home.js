import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  CategoriesList,
  CourseList,
} from 'components';
import { load as loadCourses, isLoaded as isCoursesLoaded } from 'redux/modules/course/byPortal';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';
import {withCourses, withPortal, withCourseCategories, withWishList, withCart, withUser} from 'hoc';
import {showSignUpModal} from 'redux/modules/auth';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    const portalCurrent = state.portalCurrent;
    const portalMeta = portalCurrent.get('meta');
    if (!isCategoriesLoaded(state)) promises.push(dispatch(loadCategories(portalMeta.get('slug'))));
    if (!isCoursesLoaded(state)) promises.push(dispatch(loadCourses(portalMeta.get('slug'))));
    return Promise.all(promises);
  }
}])
@connect(
  ({coursesByPortal}) => ({
    order: coursesByPortal.get('order')
  }), { showSignUpModal }
)
@withCourses
@withPortal
@withCourseCategories
@withWishList
@withCart
@withUser

export default class Home extends Component {
  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
    categories: PropTypes.object,
    portal: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    showSignUpModal: PropTypes.func,
    user: PropTypes.object,
  };

  static pageHeader = {
    title: ' - Portal',
    boldTitle: 'Home'
  }

  render() {
    const {courses, order, portal, user, cart, wishList, categories} = this.props;
    const portalName = portal.meta.get('name');
    return (
      <div className="page-container">
        <Helmet title={portalName}/>
        <div className="sidebar sidebar-main sidebar-default">
          <div className="sidebar-content">
            <CategoriesList categories={categories}/>
          </div>
        </div>
        <div className="content-wrapper">
          <CourseList
            entities={courses}
            order={order}
            wishList={wishList}
            cart={cart}
            onSessionRequired={ ()=> this.props.showSignUpModal()}
            user={user}/>
        </div>
      </div>
    );
  }
}
