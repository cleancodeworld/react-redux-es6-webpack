import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import Switch from 'react-bootstrap-switch';
import Select from 'react-select';
import {connect} from 'react-redux';
import validate from './validate';

@connect(state=>({
  formValues: state.form.CourseAccountingForm && state.form.CourseAccountingForm.values
}))
@reduxForm({
  form: 'CourseAccountingForm',
  validate
})
export default class CourseAccountingForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    formValues: PropTypes.object,
    submitStatus: PropTypes.bool,
  }

  getCurrencySymbol(currency) {
    let res = '';
    switch (currency) {
      case 'EURO':
        res = '€';
        break;
      case 'USD':
      default:
        res = '$';
        break;
    }
    return res;
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

  successRender(submitStatus, error) {
    let res = '';
    if (submitStatus && !error) {
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
      submitStatus,
      formValues,
      } = this.props;
    const {paid, currency} = formValues || {};
    return (
      <div className="panel panel-flat">
        <div className="panel-body">
          <h2>Price</h2>
          <p className="text-muted">Set the price of your course</p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
              <div className="col-md-12">
                {this.errorRender(error)}
                {this.successRender(submitStatus, error)}
                <div className="form-group">
                  <div className="clearfix">
                    <label className="control-label">Price Settings</label>
                    <span className="pull-right"><a href="#">Learn more about pricing</a></span>
                  </div>
                  <Field name="paid" component={field =>
                    <label>
                      <Switch state={field.input.value} {...field.input}
                      onChange={(val)=> field.input.onChange(val)}
                      onText="Paid" offText="Free" labelText="&nbsp;"/>
                    </label>
                  }/>
                </div>
              </div>
              <div className="paid-contents" id="collapseExample">
                <div className="col-md-2">
                  { paid
                    ?
                    <Field name="currency" component={field =>
                        <div>
                          <Select
                            {...field.input}
                            onBlur={() => {}}
                            onBlurResetsInput={false}
                            searchable={false}
                            options={['USD', 'EURO'].map( value => ({ value: value, label: value}))}
                          />
                          {field.error && <label className="validation-error-label">{field.error}</label>}
                        </div>
                  }/>
                    :
                    <div className="Select is-disabled">
                      <div className="Select-control">
                        <div className="Select-placeholder">Select...</div>
                      </div>
                    </div>
                  }
                </div>
                <div className="col-md-6">
                  { paid
                    ? <Field name="price" currency={currency} component={price =>
                      <div>
                        <Select
                          {...price.input}
                          placeholder="Price"
                          value={price.input.value.toString()}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          searchable={false}
                          options={['20', '30', '40', '50'].map( value => ({ value: `${value.toString()}`, label: `${this.getCurrencySymbol(price.currency)}${value.toString()}`}))}
                        />
                        {price.error && <label className="validation-error-label">{price.error}</label>}

                      </div>
                  }/>
                    : <div className="Select is-disabled">
                    <div className="Select-control">
                      <div className="Select-placeholder">0</div>
                    </div>
                  </div>
                  }
                </div>
              </div>
              <div className="col-md-12 text-right">
                <button type="submit" disabled={submitting} className="btn bg-blue" style={{ marginTop: '15px' }}>Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
