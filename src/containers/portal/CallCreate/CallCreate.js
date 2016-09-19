import React, { Component, PropTypes } from 'react';
import { CallForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {withUserId, withPortal} from 'hoc';
import { push } from 'react-router-redux';
import { create as callCreate } from 'redux/modules/call/create';

@connect(null, { callCreate, push })
@withUserId
@withPortal

export default class CallCreate extends Component {
  static propTypes = {
    userId: PropTypes.string,
    portal: PropTypes.object,
    create: PropTypes.func,
    push: PropTypes.func,
    callCreate: PropTypes.func,
  };

  static pageHeader = {}

  render() {
    const {userId, portal} = this.props;
    return (
      <div className="page-container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="content-wrapper">
              <div className="container">
                <Helmet title="Request Call"/>
                <CallForm
                  onSubmit={ model => this.props.callCreate(portal.meta.get('id'), {...model, requesterId: userId, expertId: userId})}/>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
