import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';

@reduxForm({
  form: 'LoginForm',
})
export default class PasswordForgetForm extends Component {
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
              <div className="icon-object border-warning text-warning"><i className="icon-spinner11"></i></div>
              <h5 className="content-group">Password recovery
                <small className="display-block">We'll send you instructions in email</small>
              </h5>
            </div>
            {this.errorRender(error)}
            <div className="form-group has-feedback">
              <Field name="email" component={email =>
                <div>
                  <input type="text" className="form-control" placeholder="Email" {...email} />
                  <div className="form-control-feedback">
                  	<i className="icon-mail5 text-muted"></i>
                  </div>
                  {email.touched && email.error && <label className="validation-error-label">{email.error}</label>}
                </div>

              }/>
            </div>
            <div className="form-group">
              <button type="submit" disabled={submitting} className="btn bg-blue btn-block">Reset password<i
                className="icon-arrow-right14 position-right"></i></button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
