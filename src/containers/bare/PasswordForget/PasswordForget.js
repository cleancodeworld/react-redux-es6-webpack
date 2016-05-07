import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { PasswordForgetForm } from 'components';
import { userLogin } from 'redux/modules/auth';

@connect(null, { userLogin })
export default class PasswordForget extends Component {

  static propTypes = {
    userLogin: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet title="Login"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <PasswordForgetForm onSubmit={ model => this.props.userLogin(model)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
