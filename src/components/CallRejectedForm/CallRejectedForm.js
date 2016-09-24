import React, {Component, PropTypes} from 'react';
import validate from './validate';
import {reduxForm, Field} from 'redux-form';

require('moment-range');

@reduxForm({
  form: 'CallApproveForm',
  validate
})

export default class CallRejectedForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    success: PropTypes.func,
    initialValues: PropTypes.object,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  }
  messageField = field =>
    <div>
      <textarea
        className="form-control"
        {...field.input}
        value={field.input.value}
      />
      {field.touched && field.error && <label className="validation-error-label">{field.error}</label>}
    </div>

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col-lg-9">
          <div className="panel panel-flat">
            <div className="panel-body">
              <form onSubmit={handleSubmit} className="form-horizontal">
                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span
                    className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">1</b></span> Message to requester
                  </legend>
                  <div className="form-group">
                    <label className="control-label col-lg-2">Message</label>
                    <div className="col-lg-10">
                      <Field name="rejectionMessage" component={this.messageField}/>
                    </div>
                  </div>
                  <div className="help-block">You will be charged <strong>$75.00</strong> for the current scheduled
                    call
                    length. If the call goes over over the scheduled time, you will be charged the balance at a rate
                    of
                    <strong>$5/min</strong>. If the call gose less than the scheduled time, you will be refunded the
                    balance.
                  </div>
                  <div className="help-block">Notifications will be sent to <b>+1 5127397250</b> and <b>john.curtis@quotient.net</b>.
                    <a href="#">Edit</a></div>
                </fieldset>
                <button type="submit" className="btn btn-primary content-group">Reject <i
                  className="icon-arrow-right14 position-right"></i></button>

                <div className="help-block">By scheduling a call you agree with our <a target="_blank" href="#">Terms
                  of
                  Service</a>.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
