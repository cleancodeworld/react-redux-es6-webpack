import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TextEditor} from 'components';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

@reduxForm({
  form: 'LessonForm',
  fields: ['title', 'description', 'thumbnail', 'content']
})
export default class LessonForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    lesson: PropTypes.object,
  }

  onDrop = (files, field)=> {
    const req = superagent.post('/upload');
    files.forEach((file)=> {
      req.attach('thumbnail', file);
    });
    req.end((err, { body } = {})=> {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        alert('Uploaded successfully ' + body.url);
        field.onChange(body.url);
      }
    });
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
    let lesson = this.props.lesson;
    if (!lesson) {
      lesson = {
        title: '',
        description: '',
        thumbnail: '',
        content: ''
      };
    }
    return (
      <div className="panel panel-flat">
        <div className="panel-heading">
          <h6 className="panel-title">Lesson Detail</h6>
        </div>
        <div className="panel-body">
          {this.errorRender(error)}
          <form onSubmit={handleSubmit} autoComplete="off">
            <Field name="title" defaultValue={lesson.title} component={title =>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" {...title} placeholder="Enter Title ..." />
                {title.touched && title.error && <span className="validation-error-label">{title.error}</span>}
              </div>
            }/>
            <Field name="thumbnail" defaultValue={lesson.thumbnail} component={thumbnail =>
              <div className="form-group">
                <div>
                  <label>Upload thumbnail</label>
                </div>
                <Dropzone
                        {...thumbnail}
                        accept="image/*" className="action btn bg-warning"
                        style={{height: 60}}
                        multiple={false} onDrop={(files)=>this.onDrop(files, thumbnail)}>
                  <div>Drop thumbnail here, or click to select file to upload.</div>
                </Dropzone>
                {thumbnail.error && <label className="validation-error-label">{thumbnail.error}</label>}
              </div>
            }/>
            <Field name="description" defaultValue={lesson.description} component={description =>
              <div className="form-group">
                <label className="display-block">Short Description</label>
                <textarea cols="5" rows="5" className="form-control" placeholder="Enter text ..." {...description}></textarea>
              </div>
            }/>
            <Field name="content" defaultValue={lesson.content} component={content =>
              <div className="form-group">
                <label>Content</label>
                <TextEditor {...content}/>
              </div>
            }/>
            <div className="text-right">
              <button type="submit" disabled={submitting} className="btn btn-primary">Save <i className="icon-arrow-right14 position-right"></i></button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
