import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { LoginForm } from 'components';
import { userLogin } from 'redux/modules/auth';

@connect(null, { userLogin })
export default class Login extends Component {
  static propTypes = {
    userLogin: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  confirmEmailWarning() {
    return (<div className="panel bg-primary login-form">
      <div className="panel-heading">
        <h6 className="panel-title text-center">Confirm your email before login</h6>
      </div>
    </div>);
  }

  render() {
    const {continueTo, message, portalName} = this.props.location.query;
    return (
      <div>
        <Helmet title="Login"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              {message === 'confirm_email' ? this.confirmEmailWarning() : <span/>}
              <LoginForm onSubmit={ model => this.props.userLogin(model, continueTo || '/', portalName)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
