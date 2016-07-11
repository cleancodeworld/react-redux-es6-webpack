import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import Switch from 'react-bootstrap-switch';
import Select from 'react-select';

@reduxForm({
  form: 'CourseAccountingForm',
})
export default class CourseAccountingForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    submitStatus: PropTypes.bool,
  }

  state = {
    isPaid: false
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
      } = this.props;
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
                  <Field name="paid" component={paid =>
                    <label>
                      <Switch state={paid.value} {...paid}
                      onChange={(val)=> {
                        paid.onChange(val);
                        this.setState({isPaid: val});
                      }}
                      onText="Paid" offText="Free" labelText="&nbsp;"/>
                    </label>
                  }/>
                </div>
              </div>
              <div className="paid-contents" id="collapseExample">
                <div className="col-md-2">
                  { this.state.isPaid
                    ?
                    <Field name="currency" component={currency =>
                        <div>
                          <Select
                            {...currency}
                            onBlur={() => {}}
                            onBlurResetsInput={false}
                            searchable={false}
                            options={['USD', 'EURO'].map( value => ({ value: value, label: value}))}
                          />
                        </div>
                  }/>
                    :
                    <div className="Select is-disabled">
                      <div className="Select-control">
                        <div className="Select-placeholder">0</div>
                      </div>
                    </div>
                  }
                </div>
                <div className="col-md-6">
                  { this.state.isPaid
                    ? <Field name="price" component={price =>
                    <div>
                      <Select
                        {...price}
                        onBlur={() => {}}
                        onBlurResetsInput={false}
                        searchable={false}
                        options={['20', '30', '40', '50'].map( value => ({ value: value.toString(), label: `$${value.toString()}`}))}
                      />
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
