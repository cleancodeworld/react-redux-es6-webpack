import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {asyncConnect} from 'redux-connect';
import {withPortals} from 'hoc';
import { isLoaded, load } from 'redux/modules/portal/allPortals';
import { remove } from 'redux/modules/portal/remove';

import { PortalsList } from 'components';
import config from '../../../config';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(load()));
    }
    return Promise.all(promises);
  }
}])

@connect(
  ({allPortals})=>({ order: allPortals.get('order') }),
  {remove}
)
@withPortals
export default class AllPortals extends Component {

  static propTypes = {
    portals: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,

  };

  render() {
    const {portals, order} = this.props;
    return (
      <div>
        <Helmet title="My Portals"/>
        <div className="page-container">
          <div className="page-content">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="panel">
                  <PortalsList portals={portals} onRemove={(portal)=> this.props.remove(portal)} order={order} config={config}/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
