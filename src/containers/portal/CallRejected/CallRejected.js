import React, { Component, PropTypes } from 'react';
import { CallRejectedForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-connect';
import {withUserId, withPortal, withCall} from 'hoc';
import { push } from 'react-router-redux';
import { create as callCreate } from 'redux/modules/call/create';
import { load, isLoaded } from 'redux/modules/call/byId';
import { reject } from 'redux/modules/call/rejectCall';

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isLoaded(state, params.callId)) {
      promises.push(dispatch(load(params.callId)));
    }
    return Promise.all(promises);
  }
}])

@connect(null, { callCreate, push, reject })
@withUserId
@withPortal
@withCall

export default class CallRejected extends Component {
  static propTypes = {
    userId: PropTypes.string,
    params: PropTypes.object,
    portal: PropTypes.object,
    call: PropTypes.object,
    create: PropTypes.func,
    push: PropTypes.func,
    reject: PropTypes.func,
    callCreate: PropTypes.func,
  };

  static pageHeader = {}

  render() {
    const {call} = this.props;
    return (
      <div className="page-container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="content-wrapper">
              <div className="container">
                <Helmet title="Request Call"/>
                <CallRejectedForm
                  onSubmit={ model => this.props.reject(call.get('id'), {
                    rejectionMessage: model.rejectionMessage
                  })}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
