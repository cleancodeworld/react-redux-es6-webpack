import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {showSignUpModal} from 'redux/modules/auth';
import { asyncConnect } from 'redux-connect';
import { CallList, } from 'components';
import { load as expertLoad, isLoaded as expertIsLoaded} from 'redux/modules/call/byExpert';
import { load as requesterLoad, isLoaded as requesterIsLoaded} from 'redux/modules/call/byRequester';
import {withUser, withCalls, withPortal} from 'hoc';

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
@withPortal

export default class MyCalls extends Component {

  static propTypes = {
    calls: PropTypes.object,
    order: PropTypes.object,
    portal: PropTypes.object,
    showSignUpModal: PropTypes.func,
    user: PropTypes.object,
  };

  static pageHeader = {
    boldTitle: 'My Calls'
  };

  render() {
    const {calls, order, user, portal} = this.props;
    return (
      <div className="page-container">
        <Helmet title="My Calls"/>
        <div className="content-wrapper">
          <div className="panel panel-body">
            <CallList entities={calls}
                      order={order}
                      portal={portal.meta}
                      user={user}/>
          </div>
        </div>
      </div>
    );
  }
}
