import React, {Component, PropTypes} from 'react';
import validate from './validate';
import {reduxForm, Field} from 'redux-form';
import Select from 'react-select';
import moment from 'moment';
import { withUser } from 'hoc';

require('moment-range');

@reduxForm({
  form: 'CallApproveForm',
  validate
})
@withUser

export default class CallAcceptedForm extends Component {
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

  render() {
    const { handleSubmit, initialValues: {availability, minutePrice}, user, error } = this.props;
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
                    <label className="control-label col-lg-2">Set date</label>
                    <div className="col-lg-10">
                      <Field name="selectedDate" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={ availability.map( value => ({ value: value, label: moment(value).format('DD/MM/YYYY HH:mm')}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>
                  <div className="help-block">You will get&nbsp;<strong>${minutePrice}/min</strong></div>
                  <div className="help-block">We will call you via&nbsp;<b>+{user.get('phone')}</b>.</div>
                </fieldset>
                <button type="submit" className="btn btn-primary content-group">Book Now <i
                  className="icon-arrow-right14 position-right"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
