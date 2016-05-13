import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import {
  PortalLayout,
  CourseListCategories,
} from '../index';
import {
  CourseListPublicItem,
} from 'components';
import { load } from 'redux/modules/course/publiclist';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(load()));
    return Promise.all(promises);
  }
}])
@connect(
  ({courseLoaded, portalCurrent}) => ({
    entities: courseLoaded.get('entities'),
    order: courseLoaded.get('orderPublic'),
    portalMeta: portalCurrent.get('meta'),
  }),
  null
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
            <div className="row">
              {order.map(course=> {
                return (<CourseListPublicItem key={entities.get(course)} course={entities.get(course)}/>);
              })}
            </div>
          </div>
        </PortalLayout>
      </div>
    );
  }
}
