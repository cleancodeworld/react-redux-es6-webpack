import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TinyMCE} from 'components';
import validate from './validate';

@reduxForm({
  form: 'PageForm',
  validate
})
export default class PageForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    success: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  }

  errorRender(error) {
    let res = <span/>;
    if (error) {
      res = (<div className="alert bg-danger alert-styled-left" role="alert">
        <strong>{error}</strong>
      </div> );
    }
    return res;
  }

  htmlField = html =>
    <div className="form-group">
      <label>Content</label>
      <TinyMCE {...html.input}/>
    </div>

  titleField = title =>
    <div className="form-group">
      <label>Title</label>
      <input type="text" name="title" className="form-control" {...title.input} placeholder="Enter Title ..."/>
      {title.touched && title.error && <span className="validation-error-label">{title.error}</span>}
    </div>

  render() {
    const {
      handleSubmit,
      submitting,
      error,
      } = this.props;
    return (
      <div className="panel panel-flat">
        <div className="panel-heading">
          <h6 className="panel-title">Page Detail</h6>
        </div>
        <div className="panel-body">
          {this.errorRender(error)}
          <form onSubmit={handleSubmit} autoComplete="off">
            <Field name="title" component={this.titleField}/>
            <Field name="html" component={this.htmlField
            }/>
            <div className="text-right">
              <button type="submit" disabled={submitting} className="btn btn-primary">
                Save
                <i className="icon-arrow-right14 position-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
