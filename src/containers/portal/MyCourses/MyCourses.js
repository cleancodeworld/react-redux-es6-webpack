import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  PortalLayout,
} from '../index';

import {
  CourseList,
} from 'components';

@connect(
  ({myCourses, courseLoaded}) => ({
    entities: courseLoaded.get('entities'),
    order: myCourses.get('order'),
    author: courseLoaded.get('author'),
  })
)
export default class MyCourses extends Component {

  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    author: PropTypes.object,
  };

  render() {
    const {entities, order, author} = this.props;
    const breadcrumbs = [
      { url: '/my-courses', name: 'My Courses' },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="My Courses">
          <div className="content-wrapper">
            <Helmet title="Home"/>
            <div className="content-group">
              <h6 className="text-semibold">My Courses</h6>
            </div>
            <CourseList entities={entities} order={order} author={author} myCourses/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}
