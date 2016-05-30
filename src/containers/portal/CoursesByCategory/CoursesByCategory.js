import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  CategoriesList,
  CourseList,
} from 'components';
import { load, isLoaded as isPublicListLoaded } from 'redux/modules/course/byPortal';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';
import {withCourses, withPortal, withCourseCategories, withWishList, withCart, withUser} from 'hoc';
import {showSignUpModal} from 'redux/modules/auth';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    const portalCurrent = state.portalCurrent;
    const portalMeta = portalCurrent.get('meta');
    // Load categories
    if (!isCategoriesLoaded(state)) {
      promises.push(dispatch(loadCategories(portalMeta.get('slug'))));
    }
    // Load all courses
    if (!isPublicListLoaded(state)) {
      promises.push(dispatch(load(portalMeta.get('slug'))));
    }
    return Promise.all(promises);
  }
}])


@withCourses
@withPortal
@withCourseCategories
@withWishList
@withCart
@withUser

@connect(
  ({coursesByPortal, categoriesLoaded}, ownProps) => ({
    order: coursesByPortal.get('order'),
    activeCategory: categoriesLoaded.getIn(['entities', ownProps.params.categoryName]),
  }), { showSignUpModal }
)

export default class CoursesByCategory extends Component {

  static propTypes = {
    courses: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    user: PropTypes.object,
    order: PropTypes.object,
    portal: PropTypes.object,
    categories: PropTypes.object,
    activeCategory: PropTypes.object,
    showSignUpModal: PropTypes.func,
  };

  static pageHeader = {
    title: ' - List',
    boldTitle: 'Courses'
  };

  render() {
    const {courses, order, activeCategory, categories, user, cart, wishList} = this.props;
    return (
      <div className="page-container">
        {activeCategory ? <Helmet title={activeCategory.get('category')}/> : null}
        <div className="sidebar sidebar-main sidebar-default">
          <div className="sidebar-content">
            <CategoriesList categories={categories} activeCategory={activeCategory}/>
          </div>
        </div>
        <div className="content-wrapper">
          <CourseList
            entities={courses}
            order={order}
            activeCategory={activeCategory}
            wishList={wishList}
            cart={cart}
            onSessionRequired={ ()=> this.props.showSignUpModal()}
            user={user}/>
        </div>
      </div>
    );
  }
}
