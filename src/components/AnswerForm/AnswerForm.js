import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TinyMCE} from 'components';
import validate from './validate';

@reduxForm({
  form: 'AnswerForm',
  validate
})

export default class AnswerForm extends Component {
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

  render() {
    const {
      handleSubmit,
      submitting,
      error,
      } = this.props;
    return (
      <div className="panel">
        <div className="panel-heading">
          <h5 className="panel-title">
            Your Answer
          </h5>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-9 col-sm-8">
              {this.errorRender(error)}
              <form onSubmit={handleSubmit} autoComplete="off">
                <Field name="content" component={content =>
                  <div className="form-group">
                    <TinyMCE {...content}/>
                  </div>}/>
                <div>
                  <button type="submit" disabled={submitting} className="btn btn-primary legitRipple">
                    POST YOUR ANSWER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
