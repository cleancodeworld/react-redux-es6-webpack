import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { PasswordForgetForm } from 'components';
import { sendResetToken } from 'redux/modules/password/forget';

@connect(null, { sendResetToken })
export default class PasswordForget extends Component {

  static propTypes = {
    sendResetToken: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet title="Login"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <PasswordForgetForm onSubmit={ model => this.props.sendResetToken(model.email)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
