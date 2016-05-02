import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { LoginForm } from 'components';
import { userLogin } from 'redux/modules/auth';

@connect(null, { userLogin })
export default class Login extends Component {

  static propTypes = {
    userLogin: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <LoginForm onSubmit={ model => this.props.userLogin(model)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
