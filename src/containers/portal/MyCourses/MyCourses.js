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
  ({cart, courseLoaded}) => ({
    entities: courseLoaded.get('entities'),
    order: cart.get('order'),
  })
)
export default class MyCourses extends Component {

  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const {entities, order} = this.props;
    const breadcrumbs = [
      { url: '/my-courses', name: 'My Courses' },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Cart">
          <div className="content-wrapper">
            <Helmet title="Home"/>
            <div className="content-group">
              <h6 className="text-semibold">My Cart</h6>
            </div>
            <CourseList entities={entities} order={order} myCourses/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}
