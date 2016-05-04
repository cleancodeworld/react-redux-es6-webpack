import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import Select from 'react-select';
@reduxForm({
  form: 'CourseForm'
})
export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string
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

  render() {
    const {
      handleSubmit,
      submitting,
      error
      } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} className="form-horizontal" autoComplete="off">
          <div className="panel panel-body col-md-6 col-md-offset-3">
            <h2 className="content-group-lg">Basic
            </h2>
            <p className="text-muted">Help Students find your course. <a href="#">Learn best Practices</a></p>
            {this.errorRender(error)}
            <div className="col-md-12">
              <div className="form-group">
                <div className="control-label">
                  Title
                </div>
                <Field name="title" component={title =>
                <div>
                  <input type="text" className="form-control" placeholder="Title" {...title} />
                  {title.touched && title.error && <label className="validation-error-label">{title.error}</label>}
                </div>
              }/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <div className="control-label">
                  Subtitle
                </div>
                <Field name="subtitle" component={subtitle =>
                <div>
                  <input type="text" className="form-control" placeholder="e.g. A-Z guide to creating amazing images and clips using the newest version." {...subtitle} />
                  {subtitle.touched && subtitle.error && <label className="validation-error-label">{subtitle.error}</label>}
                </div>
              }/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="control-label">
                  Language
                </div>
                <Field name="language" component={language =>
                <div>
                <Select
                  {...language}
                  onBlur={() => {}}
                  onBlurResetsInput={false}
                  value={language.value}
                  options={['one', 'two', 'three'].map( value => ({ value: value, label: value}))}
                  />
                  {language.touched && language.error && <label className="validation-error-label">{language.error}</label>}
                </div>
              }/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="control-label">
                  Category
                </div>
                <Field name="category" component={category =><div>
                <Select
                  {...category}
                  onBlur={() => {}}
                  onBlurResetsInput={false}
                  value={category.value}
                  options={['one', 'two', 'three'].map( value => ({ value: value, label: value}))}
                  />
                  {category.touched && category.error && <label className="validation-error-label">{category.error}</label>}
                </div>
              }/>
              </div>
            </div>
            <div className="col-md-12 text-right">
              <button type="submit" disabled={submitting} className="btn bg-blue">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
