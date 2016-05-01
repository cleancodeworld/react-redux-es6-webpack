import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'AccountPortalForm'
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
      res = (<div className="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> {error}
      </div> );
    }
    return res;
  }

  render() {
    const {
      handleSubmit,
      error
      } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {this.errorRender(error)}
            <div className="col-lg-6 col-lg-offset-3">
              <div className="panel registration-form">
                <div className="panel-body">
                  <div className="text-center">
                    <div className="icon-object border-success text-success"><i className="icon-plus3"></i></div>
                    <h5 className="content-group-lg">Create account &amp; Portal
                      <small className="display-block">All fields are required</small>
                    </h5>
                  </div>

                  <div className="form-group has-feedback">
                    <input type="text" className="form-control" placeholder="Choose username"/>
                    <div className="form-control-feedback">
                      <i className="icon-user-plus text-muted"></i>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group has-feedback">
                        <input type="text" className="form-control" placeholder="First name"/>
                        <div className="form-control-feedback">
                          <i className="icon-user-check text-muted"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group has-feedback">
                        <input type="text" className="form-control" placeholder="Last name"/>
                        <div className="form-control-feedback">
                          <i className="icon-user-check text-muted"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group has-feedback">
                        <input type="password" className="form-control" placeholder="Create password"/>
                        <div className="form-control-feedback">
                          <i className="icon-user-lock text-muted"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group has-feedback">
                        <input type="password" className="form-control" placeholder="Repeat password"/>
                        <div className="form-control-feedback">
                          <i className="icon-user-lock text-muted"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group has-feedback">
                        <input type="email" className="form-control" placeholder="Your email"/>
                        <div className="form-control-feedback">
                          <i className="icon-mention text-muted"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group has-feedback">
                    <input type="text" className="form-control" placeholder="Choose Portal name"/>
                    <div className="form-control-feedback">
                      <i className="icon-user-plus text-muted"></i>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="styled" checked="checked"/>
                        <a href="#">Personal Portal</a>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="styled" checked="checked"/>
                        Publically available
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="styled"/>
                        Accept <a href="#">terms of service</a>
                      </label>
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-link"><i className="icon-arrow-left13 position-left"></i>
                      Already a Knexpert? click to login
                    </button>
                    <button type="submit" className="btn bg-teal-400 btn-labeled btn-labeled-right ml-10 pull-right">
                      <b><i className="icon-plus3"></i></b> Create account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
