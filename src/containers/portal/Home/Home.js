import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { PortalLayout } from '../index';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { load, isLoaded } from 'redux/modules/course/byAuthor';
import {
  CourseList,
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
  ({courseLoaded, coursesByAuthor, portalCurrent}) => ({
    entities: courseLoaded.get('entities'),
    order: coursesByAuthor.get('order'),
    portalName: portalCurrent.getIn(['meta', 'name'])
  })
)
export default class Home extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    portalName: PropTypes.string,
  };

  render() {
    const {entities, order, portalName} = this.props;
    const breadcrumbs = [];
    console.log(portalName);
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Course List">
          <Helmet title={portalName}/>
          <CourseList entities={entities} order={order}/>
        </PortalLayout>
      </div>
    );
  }
}
