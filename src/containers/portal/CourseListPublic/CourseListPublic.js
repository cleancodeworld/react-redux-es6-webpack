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
import { load, loadByCategory } from 'redux/modules/course/publiclist';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    const state = getState();
    const portalCurrent = state.portalCurrent;
    const portalMeta = portalCurrent.get('meta');
    if (params.categoryName) {
      promises.push(dispatch(loadByCategory(portalMeta.get('slug'), params.categoryName)));
    } else {
      promises.push(dispatch(load(portalMeta.get('slug'))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({courseLoaded, portalCurrent}) => ({
    entities: courseLoaded.get('entities'),
    order: courseLoaded.get('orderPublic'),
    portalMeta: portalCurrent.get('meta'),
  })
)
export default class CourseListPublic extends Component {

  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    portalMeta: PropTypes.object,
  };

  render() {
    const {entities, order, portalMeta} = this.props;
    const breadcrumbs = [
      { url: '/courses', name: 'Courses' },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle={portalMeta.get('name')} title=" - Browse Courses">
          <div className="sidebar sidebar-main sidebar-default">
            <div className="sidebar-content">
              <CourseListCategories/>
            </div>
          </div>
          <div className="content-wrapper">
            <Helmet title="Home"/>
            <div className="content-group">
              <h6 className="text-semibold">Course List </h6>
            </div>
            <CourseList entities={entities} order={order}/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}
