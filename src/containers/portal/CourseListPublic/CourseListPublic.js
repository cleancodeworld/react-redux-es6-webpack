import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  PortalLayout,
  CourseListCategories,
} from '../index';
import {
  CourseList,
} from 'components';
import { load, isLoaded as isPublicListLoaded } from 'redux/modules/course/byPortal';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';

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
@connect(
  ({courseLoaded, portalCurrent, coursesByPortal}) => ({
    entities: courseLoaded.get('entities'),
    order: coursesByPortal.get('order'),
    wishList: courseLoaded.getIn(['wishList', 'entities']),
    portalMeta: portalCurrent.get('meta'),
  })
)
export default class CourseListPublic extends Component {

  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    portalMeta: PropTypes.object,
    params: PropTypes.object.isRequired,
  };

  nameToSlug(name) {
    return name.replace(' ', '-');
  }

  render() {
    const {entities, order, portalMeta, params} = this.props;
    const breadcrumbs = [];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle={portalMeta.get('name')} title=" - Browse Courses">
          <Helmet title="Home"/>
          <div className="sidebar sidebar-main sidebar-default">
            <div className="sidebar-content">
              <CourseListCategories category={params.categoryName}/>
            </div>
          </div>
          <div className="content-wrapper">
            <Helmet title="Home"/>
            <div className="content-group">
              <h6 className="text-semibold">Course List </h6>
            </div>
            <CourseList
              entities={entities}
              order={order}
              categoryName={params.categoryName}/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}
