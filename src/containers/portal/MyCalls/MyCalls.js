import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {showSignUpModal} from 'redux/modules/auth';
import { asyncConnect } from 'redux-connect';
import { CallList, } from 'components';
import { load, isLoaded } from 'redux/modules/call/all';
import {withUser, withCalls} from 'hoc';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isLoaded(state)) {
      promises.push(dispatch(load(state.portalCurrent.get('reqSubdomain'))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({callsAll}) => ({
    order: callsAll.get('order'),
  }), { showSignUpModal }
)
@withCalls
@withUser

export default class MyCalls extends Component {

  static propTypes = {
    calls: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
    showSignUpModal: PropTypes.func,
    user: PropTypes.object,
  };

  static pageHeader = {
    boldTitle: 'My Calls'
  };

  render() {
    const {calls, order, user, cart, wishList} = this.props;
    return (
      <div className="page-container">
        <Helmet title="My Calls"/>
        <div className="content-wrapper">
          <div className="content-group">
            <h6 className="text-semibold">My Calls</h6>
          </div>
          <CallList entities={calls}
                      order={order}
                      wishList={wishList}
                      cart={cart}
                      onSessionRequired={ ()=> this.props.showSignUpModal()}
                      user={user}/>
        </div>
      </div>
    );
  }
}
