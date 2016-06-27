import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {withPortals} from 'hoc';
import {asyncConnect} from 'redux-connect';
import { isLoaded, load } from 'redux/modules/portal/myPortals';
import config from '../../../config';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      const username = getState().auth.getIn(['user', 'username']);
      promises.push(dispatch(load(username)));
    }
    return Promise.all(promises);
  }
}])

@connect(
  ({myPortals})=>({ order: myPortals.get('order') })
)
@withPortals
export default class MyPortals extends Component {

  static propTypes = {
    portals: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
  };

  render() {
    const {portals, order} = this.props;
    return (
      <div>
        <Helmet title="Create Portal"/>
        <div className="page-container">
          <div className="page-content">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <div className="panel">
                  <table className="table table-striped">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Portal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map((slug, index)=> {
                      const portal = portals.get(slug);
                      return ( <tr key={portal.get('slug')}>
                        <td>{index + 1}</td>
                        <td><a href={`http://${portal.get('slug')}.${config.mainDomain}/`}>{portal.get('slug')}</a> </td>
                      </tr>);
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
