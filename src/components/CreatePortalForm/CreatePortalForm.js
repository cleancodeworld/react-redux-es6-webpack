import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import asyncValidate from './asyncValidate';
import validate from './validate';
import debounce from 'lodash/debounce';
const debounceBlurField = debounce((field, event)=>field.input.onBlur(event), 500);

@reduxForm({
  form: 'CreatePortalForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['name']
})
export default class CreatePortalForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string
  }

  errorRender(error) {
    let res = <span/>;
    if (error) {
      res = (<div className="alert bg-danger alert-styled-left" role="alert">
        <strong>Oh snap!</strong> {error}
      </div> );
    }
    return res;
  }

  nameField = name =>
    <div>
      <input type="text" className="form-control" {...name.input}
             onChange={event=> {
               name.input.onChange(event);
               event.persist();
               debounceBlurField(name, event);
             }}
             placeholder="Portal name"/>
      {name.touched && name.error && <span className="validation-error-label">{name.error}</span>}
    </div>

  descriptionField = description =>
    <div>
      <input type="text" className="form-control" {...description.input} onChange={event=>description.onBlur(event)}
             placeholder="Portal Description"/>
      {description.touched && description.error && <span className="validation-error-label">{description.error}</span>}
    </div>

  typeField = type =>
    <div>
      <input type="checkbox" className="styled" {...type.input} placeholder="Portal Type"/>
      <a href="#">Portal Type</a>
    </div>

  privacyField = privacy=><div>
    <input type="checkbox" className="styled" {...privacy.input} placeholder="Publically available"/>
    Publically available
  </div>

  isAcceptedField = isAccepted =>
    <div>
      <input type="checkbox" className="styled" {...isAccepted.input} placeholder="terms of service"/>
      Accept <a href="#">terms of service</a>
      {isAccepted.touched && isAccepted.error && <span className="validation-error-label">{isAccepted.error}</span>}
    </div>

  render() {
    const {
      handleSubmit,
      submitting,
      error
      } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <div className="panel registration-form">
                <div className="panel-body">
                  <div className="text-center">
                    <div className="icon-object border-success text-success"><i className="icon-plus3"></i></div>
                    <h5 className="content-group-lg">Create Portal
                      <small className="display-block">All fields are required</small>
                    </h5>
                  </div>
                  {this.errorRender(error)}
                  <div className="form-group has-feedback">
                    <Field name="name" component={this.nameField}/>
                    <div className="form-control-feedback">
                      <i className="icon-user-plus text-muted"></i>
                    </div>
                  </div>
                  <div className="form-group has-feedback">
                    <Field name="description" component={this.descriptionField}/>
                    <div className="form-control-feedback">
                      <i className="icon-user-plus text-muted"></i>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <Field name="type" component={this.typeField}/>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <Field name="privacy" component={this.privacyField}/>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <Field name="isAccepted" component={this.isAcceptedField}/>
                      </label>
                    </div>
                  </div>
                  <div className="form-group text-center">
                    <button type="submit" disabled={submitting} className="btn bg-teal-400">Create <i
                      className="icon-circle-right2 position-right"></i></button>
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
