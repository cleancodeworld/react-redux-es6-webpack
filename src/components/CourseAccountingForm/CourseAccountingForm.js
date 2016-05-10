import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import Select from 'react-select';
import Switch from 'react-bootstrap-switch';

@reduxForm({
  form: 'CourseAccountingForm',
  overwriteOnInitialValuesChange: false,
})
export default class CourseAccountingForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
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

  successRender(error) {
    let res = '';
    if (!error) {
      res = (<div className="alert bg-success alert-styled-left" role="alert">
        <strong>Success!</strong>
      </div> );
    }
    return res;
  }

  render() {
    const {
      handleSubmit,
      submitting,
      error,
    } = this.props;
    this.successRender(Field, handleSubmit, submitting, error);
    return (
      <div className="panel panel-flat">
        <div className="panel-body">
          <h2>Price &amp; Coupons</h2>
          <p className="text-muted">Set the price of your course and promote it with a discounted coupon code</p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
              <div className="col-md-12">
                {this.errorRender(error)}
                {/* this.successRender(error) */}
                <div className="form-group">
                  <div className="clearfix">
                    <label className="control-label">Price Settings</label>
                    <span className="pull-right"><a href="#">Learn more about pricing</a></span>
                  </div>
                  <label>
                    <Switch onText="Paid" offText="Free" labelText="&nbsp;" />
                  </label>
                </div>
              </div>
              <div className="paid-contents" id="collapseExample">
                <div className="col-md-2">
                  <Select
                    options={['USD', 'EURO'].map( value => ({ value: value, label: value}))}
                  />
                </div>
                <div className="col-md-6">
                  <Select
                    options={['20.00', '30.00', '40.00', '50.00'].map( value => ({ value: value, label: '$' + value}))}
                  />
                </div>
              </div>
              <div className="col-md-12 text-right">
                <button type="reset" className="btn btn-danger legitRipple">Cancel</button>&nbsp;
                <button type="submit" className="btn btn-primary legitRipple">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
