import React, { Component, PropTypes } from 'react';
import { CallAcceptedForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-connect';
import {withUserId, withPortal, withCall} from 'hoc';
import { push } from 'react-router-redux';
import { create as callCreate } from 'redux/modules/call/create';
import { load, isLoaded } from 'redux/modules/call/byId';
import { setSelectedDate } from 'redux/modules/call/setSelectedDate';

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

@connect(null, { callCreate, push, setSelectedDate })
@withUserId
@withPortal
@withCall

export default class CallAccepted extends Component {
  static propTypes = {
    userId: PropTypes.string,
    params: PropTypes.object,
    portal: PropTypes.object,
    call: PropTypes.object,
    create: PropTypes.func,
    push: PropTypes.func,
    setSelectedDate: PropTypes.func,
    callCreate: PropTypes.func,
  };

  static pageHeader = {}

  render() {
    const {call, portal} = this.props;
    return (
      <div className="page-container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="content-wrapper">
              <div className="container">
                <Helmet title="Request Call"/>
                <CallAcceptedForm
                  initialValues={{availability: call.get('availability') && call.get('availability').toJS() || [], minutePrice: portal.meta.getIn(['owner', 'minutePrice'])}}
                  onSubmit={ model => this.props.setSelectedDate(call.get('id'), {
                    selectedDate: model.selectedDate
                  })}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
