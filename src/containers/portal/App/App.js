import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { isLoaded as isPortalLoaded, load as portalLoaded } from 'redux/modules/portal/current';
import { isLoaded as isWishListLoaded, load as wishListLoaded } from 'redux/modules/wish-list';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isPortalLoaded(state)) {
      promises.push(dispatch(portalLoaded(state.portalCurrent.get('reqSubdomain'))));
    }
    if (!isWishListLoaded(state)) {
      promises.push(dispatch(wishListLoaded()));
    }
    return Promise.all(promises);
  }
}])
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
