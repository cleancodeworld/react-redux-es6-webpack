import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TextEditor} from 'components';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import validate from './validate';

@reduxForm({
  form: 'LessonForm',
  validate
})
export default class LessonForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    success: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  }

  state = {
    isUploadingImage: false
  }

  onDrop = (files, field)=> {
    const fileType = files[0].type;
    if (fileType.indexOf('image') > -1) {
      const req = superagent.post('/upload');
      files.forEach((file)=> {
        req.attach('thumbnail', file);
      });
      this.setState({ isUploadingImage: true });
      req.end((err, { body } = {})=> {
        this.setState({ isUploadingImage: false });
        if (err) {
          if (!err.crossDomain) {
            alert(JSON.stringify(err));
          }
        } else {
          field.input.onChange(body.url);
        }
      });
    }
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

  titleField = title =>
    <div className="form-group">
      <label>Title</label>
      <input type="text" name="title" className="form-control" {...title.input} placeholder="Enter Title ..."/>
      {title.touched && title.error && <span className="validation-error-label">{title.error}</span>}
    </div>
  videoUrlField = videoUrl =>
    <div className="form-group">
      <label className="display-block">Video url</label>
      <input type="text" name="videoUrl" className="form-control" {...videoUrl.input}
             placeholder="Enter Video Url ..."/>
      {videoUrl.touched && videoUrl.error && <span className="validation-error-label">{videoUrl.error}</span>}
    </div>
  descriptionField = description =>
    <div className="form-group">
      <label className="display-block">Short Description</label>
      <textarea cols="5" rows="5" className="form-control"
                placeholder="Enter text ..." {...description.input}></textarea>
    </div>

  contentField = content =>
    <div className="form-group">
      <label>Content</label>
      <TextEditor {...content.input}/>
      {content.touched && content.error && <span className="validation-error-label">{content.error}</span>}
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
          <h6 className="panel-title">Lesson Detail</h6>
        </div>
        <div className="panel-body">
          {this.errorRender(error)}
          <form onSubmit={handleSubmit} autoComplete="off">
            <Field name="title" component={this.titleField}/>
            <Field name="videoUrl" component={this.videoUrlField}/>
            <Field name="thumbnail" component={thumbnail =>
              <div className="form-group">
                <div>
                  <label>Upload thumbnail</label>
                </div>
                <Dropzone
                        {...thumbnail.input}
                        multiple={false} accept="image/*"
                        accept="image/*" className="action btn bg-warning upload-btn"
                        multiple={false} onDrop={(files)=>this.onDrop(files, thumbnail)}>
                  <div>Drop thumbnail here, or click to select file to upload.</div>
                </Dropzone>
                {thumbnail.error && <label className="validation-error-label">{thumbnail.error}</label>}
                {this.state.isUploadingImage && <span style={{marginLeft: 5}} className="label bg-blue">Uploading</span>}
                {!thumbnail.error && thumbnail.input.value && <img src={thumbnail.input.value} width="50" height="50"></img>}
              </div>
            }/>
            <Field name="description" component={this.descriptionField}/>
            <Field name="content" component={this.contentField}/>
            <div className="text-right">
              <button type="submit" disabled={submitting || this.state.isUploadingImage} className="btn btn-primary">
                Save <i
                className="icon-arrow-right14 position-right"></i></button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
