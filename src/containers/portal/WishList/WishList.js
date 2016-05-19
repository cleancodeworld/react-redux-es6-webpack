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
  ({wishList, courseLoaded}) => ({
    entities: courseLoaded.get('entities'),
    order: wishList.get('order'),
  })
)
export default class WishList extends Component {

  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const {entities, order} = this.props;
    const breadcrumbs = [
      { url: '/wish-list', name: 'Wish list' },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle={'nour'} title=" - Browse Courses">
          <div className="content-wrapper">
            <Helmet title="Home"/>
            <div className="content-group">
              <h6 className="text-semibold">My wish list </h6>
            </div>
            <CourseList entities={entities} order={order}/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}
