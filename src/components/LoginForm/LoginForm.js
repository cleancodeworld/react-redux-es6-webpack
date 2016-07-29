import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import validate from './validate';
import config from 'config';

@reduxForm({
  form: 'LoginForm',
  validate,
})
export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string
  }

  errorRender(error) {
    let res = <span/>;
    if (error) {
      res = (<div className="alert bg-danger alert-styled-left" role="alert">
        <strong>{error}</strong>
      </div> );
    }
    return res;
  }

  emailField = (field) =>( <div>
    <input type="text" className="form-control" placeholder="Email" {...field.input} />
    <div className="form-control-feedback">
      <i className="icon-user text-muted"></i>
    </div>
    {field.touched && field.error && <label className="validation-error-label">{field.error}</label>}
  </div>)

  passwordField = (field) =>
    (<div>
      <input type="password" className="form-control" placeholder="Password" {...field.input} />
      <div className="form-control-feedback">
        <i className="icon-lock2 text-muted"></i>
      </div>
      {field.touched && field.error && <label className="validation-error-label">{field.error}</label>}
    </div>)

  rememberMeField = (field) =>
    ( <div className="col-sm-6">
      <label className="checkbox-inline">
        <input type="checkbox" className="styled" {...field.input} placeholder="Remember Me"/>
        Remember Me
      </label>
    </div>);

  render() {
    const {
      handleSubmit,
      submitting,
      error
      } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="panel panel-body login-form">
            <div className="text-center">
              <div className="icon-object border-warning-400 text-warning-400"><i className="icon-people"></i></div>
              <h5 className="content-group-lg">Login to your knexpert account
                <small className="display-block">Enter your credentials</small>
              </h5>
            </div>
            {this.errorRender(error)}
            <div className="form-group has-feedback has-feedback-left">
              <Field name="email" component={this.emailField}/>
            </div>

            <div className="form-group has-feedback has-feedback-left">
              <Field name="password" component={this.passwordField}/>
            </div>

            <div className="form-group login-options">
              <div className="row">
                <Field name="remember" component={this.rememberMeField}/>
                <div className="col-sm-6 text-right">
                  <a href={`http://${config.mainDomain}/password/forget`}>Forgot password?</a>
                </div>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" disabled={submitting} className="btn bg-blue btn-block">Login <i
                className="icon-circle-right2 position-right"></i></button>
            </div>

            <div className="content-divider text-muted form-group"><span>Don't have an account?</span></div>
            <a href={`http://${config.mainDomain}/account-portal-create`}
               className="btn bg-slate btn-block content-group">Register</a>
            <span className="help-block text-center no-margin">By continuing, you're confirming that you've read our <a
              href="#">Terms &amp; Conditions</a> and <a href="#">Cookie Policy</a></span>
          </div>
        </form>
      </div>
    );
  }
}
