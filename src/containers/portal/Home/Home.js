import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { PortalLayout } from '../index';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { load, isLoaded } from 'redux/modules/course/list';
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
    order: courseLoaded.get('order'),
  }),
  null
)
export default class Home extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const {entities, order} = this.props;

    const breadcrumbs = [];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Course List">
            <Helmet title="Home"/>
            <div className="row">
              {order.map(course=> {
                return (<CourseListItem key={entities.get(course)} course={entities.get(course)}/>);
              })}
            </div>
        </PortalLayout>
      </div>
    );
  }
}
