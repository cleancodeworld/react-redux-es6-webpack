import React, { Component, PropTypes } from 'react';
import { CallFeedbackForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-connect';
import {withUserId, withPortal, withCall} from 'hoc';
import { push } from 'react-router-redux';
import { create as callCreate } from 'redux/modules/call/create';
import { load, isLoaded } from 'redux/modules/call/byId';
import { feedback } from 'redux/modules/call/feedback';

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

@connect(null, { callCreate, push, feedback })
@withUserId
@withPortal
@withCall

export default class CallFeedback extends Component {
  static propTypes = {
    userId: PropTypes.string,
    params: PropTypes.object,
    portal: PropTypes.object,
    call: PropTypes.object,
    create: PropTypes.func,
    push: PropTypes.func,
    feedback: PropTypes.func,
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
                <CallFeedbackForm
                  onSubmit={ model => this.props.feedback(call.get('id'), model)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
