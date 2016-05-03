import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';

@reduxForm({
  form: 'LoginForm',
  fields: ['email', 'password', 'remember']
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
      res = (<div className="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> {error}
      </div> );
    }
    return res;
  }

  render() {
    const {
      handleSubmit,
      submitting,
      error
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {this.errorRender(error)}
          <div className="panel panel-body login-form">
            <div className="text-center">
              <div className="icon-object border-warning-400 text-warning-400"><i className="icon-people"></i></div>
              <h5 className="content-group-lg">Login to your knexpert account <small className="display-block">Enter your credentials</small></h5>
            </div>

            <div className="form-group has-feedback has-feedback-left">
              <Field name="email" component={email =>
                <div>
                  <input type="text" className="form-control" placeholder="Email" {...email} />
                  <div className="form-control-feedback">
                    <i className="icon-user text-muted"></i>
                  </div>
                  {email.touched && email.error && <label className="validation-error-label">{email.error}</label>}
                </div>
              }/>
            </div>

            <div className="form-group has-feedback has-feedback-left">
              <Field name="password" component={password =>
                <div>
                  <input type="password" className="form-control" placeholder="Password" {...password} />
                  <div className="form-control-feedback">
                    <i className="icon-lock2 text-muted"></i>
                  </div>
                  {password.touched && password.error && <label className="validation-error-label">{password.error}</label>}
                </div>
              }/>
            </div>

            <div className="form-group login-options">
              <div className="row">
                <Field name="remember" component={remember =>
                  <div className="col-sm-6">
                    <label className="checkbox-inline">
                      <input type="checkbox" className="styled" {...remember} placeholder="Remember Me"/>
                      Remember Me
                    </label>
                  </div>
                }/>

                <div className="col-sm-6 text-right">
                  <a href="/forgot-password">Forgot password?</a>
                </div>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" disabled={submitting} className="btn bg-blue btn-block">Login <i className="icon-circle-right2 position-right"></i></button>
            </div>

            <div className="content-divider text-muted form-group"><span>Don't have an account?</span></div>
            <a href="/register" className="btn bg-slate btn-block content-group">Register</a>
            <span className="help-block text-center no-margin">By continuing, you're confirming that you've read our <a href="#">Terms &amp; Conditions</a> and <a href="#">Cookie Policy</a></span>
          </div>
        </form>
      </div>
    );
  }
}
