import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {showSignUpModal} from 'redux/modules/auth';
import { asyncConnect } from 'redux-connect';
import { CallList, } from 'components';
import { load as expertLoad, isLoaded as expertIsLoaded} from 'redux/modules/call/byExpert';
import { load as requesterLoad, isLoaded as requesterIsLoaded} from 'redux/modules/call/byRequester';
import {withUser, withCalls} from 'hoc';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!expertIsLoaded(state)) {
      promises.push(dispatch(expertLoad(state.auth.getIn(['user', 'username']))));
    }
    if (!requesterIsLoaded(state)) {
      promises.push(dispatch(requesterLoad(state.auth.getIn(['user', 'username']))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({callsByExpert}) => ({
    order: callsByExpert.get('order'),
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
          <div className="panel panel-body">
            <CallList entities={calls}
                      order={order}
                      wishList={wishList}
                      cart={cart}
                      onSessionRequired={ ()=> this.props.showSignUpModal()}
                      user={user}/>
          </div>
        </div>
      </div>
    );
  }
}
