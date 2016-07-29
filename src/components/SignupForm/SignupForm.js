import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import asyncValidate from './asyncValidate';
import {Link} from 'react-router';  // eslint-disable-line
import validate from './validate';
import debounce from 'lodash/debounce';
import config from '../../config';
const debounceBlurField = debounce((field, event)=>field.input.onBlur(event), 500);

@reduxForm({
  form: 'SignupForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})
export default class AccountPortalForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string
  }


  errorRender(error) {
    let res = <span/>;
    if (error) {
      res = (<div className="alert bg-danger alert-styled-left" role="alert">
        <strong>Oh snap!</strong> {error}
      </div> );
    }
    return res;
  }

  loginUrl() {
    if (!config.port || config.port === 80) {
      return `http://${config.mainDomain}/login`;
    }
    return `http://${config.mainDomain}:${config.port}/login`;
  }

  usernameField = (username)=>
    <div>
      <input type="text" className="form-control" {...username.input}
             onChange={event=> {
               username.input.onChange(event);
               event.persist();
               debounceBlurField(username, event);
             }} placeholder="Choose username"/>
      {username.touched && username.error && <label className="validation-error-label">{username.error}</label>}
    </div>

  firstNameField = firstName =>
    <div>
      <input type="text" className="form-control" {...firstName.input} placeholder="First name"/>
      {firstName.touched && firstName.error && <label className="validation-error-label">{firstName.error}</label>}
    </div>

  lastNameField = lastName =>
    <div>
      <input type="text" className="form-control" {...lastName.input} placeholder="Last name"/>
      {lastName.touched && lastName.error && <label className="validation-error-label">{lastName.error}</label>}
    </div>

  passwordField = password =>
    <div>
      <input type="password" className="form-control" {...password.input}
             placeholder="Create password"/>
      {password.touched && password.error && <label className="validation-error-label">{password.error}</label>}
    </div>

  confirmPasswordField = confirmPassword =>
    <div>
      <input type="password" className="form-control" {...confirmPassword.input}
             placeholder="Repeat password"/>
      {confirmPassword.touched && confirmPassword.error &&
      <label className="validation-error-label">{confirmPassword.error}</label>}
    </div>

  emailField = email =>
    <div>
      <input type="text" className="form-control" {...email.input} placeholder="Email"/>
      {email.touched && email.error && <label className="validation-error-label">{email.error}</label>}
    </div>

  isAcceptedField = isAccepted =>
    <div>
      <input type="checkbox" className="styled" {...isAccepted.input} placeholder="terms of service"/>
      Accept <a href="#">terms of service</a>
      {isAccepted.touched && isAccepted.error && <span className="validation-error-label">{isAccepted.error}</span>}
    </div>

  render() {
    const {
      handleSubmit,
      submitting,
      error
      } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <div className="icon-object border-success text-success"><i className="icon-plus3"></i></div>
            <h5 className="content-group-lg">Sign Up For an Account
              <small className="display-block">All fields are required</small>
            </h5>
          </div>
          {this.errorRender(error)}
          <div className="form-group has-feedback">
            <Field name="username" component={this.usernameField}/>
            <div className="form-control-feedback">
              <i className="icon-user-plus text-muted"></i>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <Field name="firstName" component={this.firstNameField}/>
                <div className="form-control-feedback">
                  <i className="icon-user-check text-muted"></i>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <Field name="lastName" component={this.lastNameField}/>
                <div className="form-control-feedback">
                  <i className="icon-user-check text-muted"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <Field name="password" component={this.passwordField}/>
                <div className="form-control-feedback">
                  <i className="icon-user-lock text-muted"></i>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <Field name="confirmPassword" component={this.confirmPasswordField}/>
                <div className="form-control-feedback">
                  <i className="icon-user-lock text-muted"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <Field name="email" component={this.emailField}/>
                <div className="form-control-feedback">
                  <i className="icon-mention text-muted"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="checkbox">
            <label>
              <Field name="isAccepted" component={this.isAcceptedField}/>
            </label>
          </div>
          <div className="clearfix">
            {/* <Link to="/login" className="btn btn-link pull-left" style={{ paddingLeft: 0, paddingRight: 0 }}>
             <i className="icon-arrow-left13 position-left"></i> Already have an account? click to login
             </Link> */}
            <a href={this.loginUrl()} className="btn btn-link pull-left" style={{ paddingLeft: 0, paddingRight: 0 }}>
              <i className="icon-arrow-left13 position-left"></i> Already have an account? click to login
            </a>
            <button type="submit" disabled={submitting} className="btn bg-teal-400 ml-10 pull-right">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
