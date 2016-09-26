import React, {Component, PropTypes} from 'react';
import validate from './validate';
import {reduxForm, Field} from 'redux-form';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { withUser, withPortal } from 'hoc';

require('moment-range');

@reduxForm({
  form: 'CallForm',
  validate
})
@withUser
@withPortal

export default class CallForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    expertUserName: PropTypes.string,
    portal: PropTypes.object,
    user: PropTypes.object,
    success: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  }

  componentDidMount() {
    const datetime = moment().set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
    const start = datetime.clone().startOf('day');
    const end = datetime.clone().endOf('day');
    const hours = [];
    moment()
      .range(start, end)
      .by('hours', hour => {
        hours.push({
          moment: hour,
          label: hour.format('h:mm a')
        });
        const halfHour = hour.clone().add(30, 'minutes');
        hours.push({
          moment: halfHour,
          label: halfHour.format('h:mm a')
        });
      });
    this.hours = hours;
  }

  messageField = (field) =>( <div>
    <textarea rows="2" cols="2" className="form-control"
              placeholder="Please enter a reason for the call" {...field.input}></textarea>
    {field.touched && field.error && <label className="validation-error-label">{field.error}</label>}
  </div>)

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
    const { handleSubmit, expertUserName, portal, user } = this.props;
    return (
      <div className="row">
        <div className="col-lg-9">
          <div className="panel panel-flat">
            <div className="panel-body">
              <form onSubmit={handleSubmit} className="form-horizontal">
                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span
                    className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">1</b></span> Provide Call Information
                  </legend>
                  {portal.meta.getIn(['owner', 'id']) === user.get('userId') ? this.errorRender('You are portal owner, you can not call yourself') :
                    <span/>}
                  <div className="form-group">
                    <label className="control-label col-lg-2">Message to {expertUserName}</label>
                    <div className="col-lg-10">
                      <Field name="message" component={this.messageField}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-lg-2">Set Estimated Length</label>
                    <div className="col-lg-10">
                      <Field name="estimated" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={ [15, 30, 60].map( value => ({ value: value, label: `${value} minutes`}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>
                  <div className="help-block">call cost&nbsp;
                    <strong>${portal.meta.getIn(['owner', 'minutePrice'])}/min</strong>
                  </div>
                  <div className="help-block">we will call you via&nbsp;<b>+{user.get('phone')}</b>.</div>
                </fieldset>
                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span
                    className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">2</b></span> Suggest Times When You're Free to Talk
                  </legend>
                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <Field name="date1" component={field =>
                          <div>
                              <DatePicker placeholder="Pick a date…"
                                onChange={field.input.onChange}
                                selected={field.input.value}
                                className="form-control datepicker hasDatepicker" />
                            <div style={{display: 'inline-block'}}>
                              {field.touched && field.error && <label className="validation-error-label">{field.error}</label>}
                            </div>
                          </div>
                        }/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <Field name="time1" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={this.hours && this.hours.map( value => ({ value: value.label, label: value.label}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <Field name="date2" component={field =>
                          <div>
                            <DatePicker placeholder="Pick a date…"
                              onChange={field.input.onChange}
                              selected={field.input.value}
                              className="form-control datepicker hasDatepicker" />
                            <div style={{display: 'inline-block'}}>
                              {field.touched && field.error && <label className="validation-error-label">{field.error}</label>}
                            </div>
                          </div>
                        }/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <Field name="time2" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={this.hours && this.hours.map( value => ({ value: value.label, label: value.label}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/></div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <Field name="date3" component={field =>
                          <div>
                            <DatePicker placeholder="Pick a date…"
                              onChange={field.input.onChange}
                              selected={field.input.value}
                              className="form-control datepicker hasDatepicker" />
                            <div style={{display: 'inline-block'}}>
                              {field.touched && field.error && <label className="validation-error-label">{field.error}</label>}
                            </div>
                          </div>
                        }/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <Field name="time3" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={this.hours && this.hours.map( value => ({ value: value.label, label: value.label}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>
                  <div className="help-block">Please note that the times you choose will be based on your local time
                    zone
                  </div>
                </fieldset>
                <button type="submit" className="btn btn-primary content-group"
                        disabled={portal.meta.getIn(['owner', 'id']) === user.get('userId')}>Book Now <i
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
