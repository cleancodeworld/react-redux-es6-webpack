import React, {Component, PropTypes} from 'react';
import validate from './validate';
import {reduxForm, Field} from 'redux-form';
import Rating from 'react-rating';

require('moment-range');

@reduxForm({
  form: 'CallApproveForm',
  validate
})

export default class CallFeedbackForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    success: PropTypes.func,
    initialValues: PropTypes.object,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  state = { rate: 5 };

  onChange(rate) {
    this.setState({ rate });
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
                    className="text-size-large">1</b></span> Leave feedback
                  </legend>
                  <div className="form-group">
                    <label className="control-label col-lg-2">Message</label>
                    <div className="col-lg-10">
                      <Field name="rejectionMessage" component={this.messageField}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-lg-2">Rate</label>
                    <div className="col-lg-10">
                      <Rating empty={<i className="fa fa-star-o"/>}
                              full={<i className="fa fa-star"/>}
                              onChange={this.onChange}
                              initialRate={this.state.rate}/>
                    </div>
                  </div>
                </fieldset>
                <button type="submit" className="btn btn-primary content-group">Post Feedback <i
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
