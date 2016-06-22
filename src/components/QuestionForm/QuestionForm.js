import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TinyMCE} from 'components';
import validate from './validate';
// import {WithContext as ReactTags} from 'react-tag-input';

@reduxForm({
  form: 'QuestionForm',
  validate
})

export default class QuestionForm extends Component {
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
    // const suggestions = ['mango', 'pineapple', 'orange', 'pear'];
    const {
      handleSubmit,
      submitting,
      error,
      } = this.props;
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="row">

            <div className="col-md-9 col-sm-8">
              {this.errorRender(error)}
              <form onSubmit={handleSubmit} autoComplete="off">
                <Field name="title" component={title =>
                    <div className="input-group mb-20">
                      <span className="input-group-addon">Title</span>
                      <input type="text" name="title" className="form-control" {...title} placeholder="Enter Title ..." />
                      {title.touched && title.error && <span className="validation-error-label pull-left">{title.error}</span>}
                    </div>}/>
                <Field name="content" component={content =>
                  <div className="form-group">
                    <TinyMCE {...content}/>
                  </div>}/>

                <div className="input-group mt-20 mb-20">

                  <Field name="notifyAnswerByEmail" component={(notifyAnswerByEmail) =>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" {...notifyAnswerByEmail} />
                      <strong>Send me new responses to my posts via email</strong>
                      <a href="#">(settings)</a>
                    </label>
                  </div>}
                  />
                </div>
                <div>
                  <button type="submit" disabled={submitting} className="btn btn-primary legitRipple">
                    POST YOUR QUESTION
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-3 col-sm-4">
              <div className="sticky-note mb-20">
                <h5>How to Ask</h5>
                <p className="text-bold">Is your question about programming?</p>

                <p>We prefer questions that can be answered, not just discussed.</p>
                <p>Provide details. Share your research.</p>
                <p>If your question is about this website, ask it on meta instead.</p>

                <div className="text-right">
                  <a href="#" className="display-block">visit the help center »</a>
                  <a href="#" className="display-block">asking help »</a>
                </div>
              </div>
              <div className="sticky-note mb-20">
                <h5>How to Format</h5>

                <p>▸ put returns between paragraphs</p>
                <p>▸ for linebreak add 2 spaces at end</p>
                <p>▸ _italic_ or **bold**</p>
                <p>▸ indent code by 4 spaces</p>
                <p>▸ backtick escapes `like _so_`</p>
                <p>▸ quote by placing &gt; at start of line</p>
                <p>▸ to make links</p>

                <p>
                  &lt;http://foo.com&gt;<br/>
                  [foo](http://foo.com)<br/>
                  &lt;a href="http://foo.com"&gt;foo&lt;/a&gt;
                </p>

                <p>▸ basic HTML also allowed</p>

                <div className="text-right">
                  <a href="#" className="display-block">formatting help »</a>
                  <a href="#" className="display-block">asking help »</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
