import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { PasswordResetForm } from 'components';
import { changePassword } from 'redux/modules/password/reset';

@connect(null, { changePassword })
export default class PasswordReset extends Component {

  static propTypes = {
    changePassword: PropTypes.func.isRequired,
    location: PropTypes.object,

  };

  render() {
    return (
      <div>
        <Helmet title="Login"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <PasswordResetForm onSubmit={ model =>
              this.props.changePassword({
                newPassword: model.password,
                ResetToken: this.props.location.query.token
              })}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
