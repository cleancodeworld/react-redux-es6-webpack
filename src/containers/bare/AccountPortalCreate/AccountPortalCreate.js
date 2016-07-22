import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {AccountPortalForm} from 'components';
import { connect } from 'react-redux';
import { createWithPortal as userCreateWithPortal } from 'redux/modules/user/create';
import { push } from 'react-router-redux';
import { publicOnly } from 'hoc';

@publicOnly
@connect(null, { userCreateWithPortal, push })
export default class AccountPortalCreate extends Component {

  static propTypes = {
    userCreateWithPortal: PropTypes.func.isRequired,
    push: PropTypes.func,
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <AccountPortalForm
                onSubmit={ model => this.props.userCreateWithPortal(model)
                .then(()=>this.props.push(`/login?message=confirm_email&portalName=${model.portalName}`))}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
