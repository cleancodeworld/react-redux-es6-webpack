import React, {Component, PropTypes} from 'react';
import validate from './validate';
import {reduxForm, Field} from 'redux-form';
import { withUser } from 'hoc';

require('moment-range');

@reduxForm({
  form: 'UserProfileForm',
  validate
})
@withUser

export default class UserProfileForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    success: PropTypes.func,
    initialValues: PropTypes.object,
    user: PropTypes.object,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  }

  errorRender = (error) => {
    let res = <span/>;
    if (error) {
      res = (<div className="alert bg-danger alert-styled-left" role="alert">
        <strong>{error}</strong>
      </div> );
    }
    return res;
  }

  phoneField = phone =>
    <div>
      <input type="text" className="form-control" {...phone.input} placeholder="Phone"/>
      {phone.touched && phone.error && <label className="validation-error-label">{phone.error}</label>}
    </div>

  render() {
    const { handleSubmit, error } = this.props;
    return (
      <div className="row">
        <div className="col-lg-9">
          <div className="panel panel-flat">
            <div className="panel-body">
              <form onSubmit={handleSubmit} className="form-horizontal">
                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span
                    className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">1</b></span> Select call date
                  </legend>
                  {this.errorRender(error)}
                  <div className="form-group">
                    <label className="control-label col-lg-2">Phone</label>
                    <div className="col-lg-10">
                      <div className="form-group">
                        <Field name="phone" component={this.phoneField}/>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <button type="submit" className="btn btn-primary content-group">Update<i
                  className="icon-arrow-right14 position-right"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
