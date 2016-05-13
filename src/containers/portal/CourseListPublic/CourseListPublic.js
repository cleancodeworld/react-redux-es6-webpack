import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import {
  PortalLayout,
} from '../index';
import {
  CourseListItem,
} from 'components';
import { load } from 'redux/modules/course/publiclist';

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
export default class CourseListPublic extends Component {

  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const {entities, order} = this.props;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' }
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Course List">
          <PortalAuthorLayout>
            <Helmet title="Home"/>
            <div className="content-group">
              <h6 className="text-semibold">Course List </h6>
            </div>
            <div className="content-group">
              <Link to="/author/course/create" className="btn bg-blue">Create Course</Link>
            </div>
            <div className="row">
              {order.map(course=> {
                return (<CourseListItem key={entities.get(course)} course={entities.get(course)}/>);
              })}
            </div>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
