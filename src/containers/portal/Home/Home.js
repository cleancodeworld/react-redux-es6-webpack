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
import {withCourses, withPortal} from 'hoc';

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
  })
)
@withCourses
@withPortal

export default class Home extends Component {
  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
    portal: PropTypes.object
  };

  static pageHeader = {
    title: ' - Browse Courses',
    boldTitle: 'Home'
  }

  render() {
    const {courses, order, portal} = this.props;
    const portalName = portal.meta.get('name');
    return (
      <div className="page-container">
        <Helmet title={portalName}/>
        <div className="sidebar sidebar-main sidebar-default">
          <div className="sidebar-content">
            <CategoriesList />
          </div>
        </div>
        <div className="content-wrapper">
          <CourseList
            entities={courses}
            order={order}/>
        </div>
      </div>
    );
  }
}
