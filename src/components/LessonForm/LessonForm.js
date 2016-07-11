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
    const _file = files[0];
    if (_file.name.indexOf('.jpg') > -1 || _file.name.indexOf('.png') > -1 || _file.name.indexOf('.jpeg') || -1 || _file.name.indexOf('.gif') || -1) {
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
          field.onChange(body.url);
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
            <Field name="title" component={title =>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" {...title} placeholder="Enter Title ..." />
                {title.touched && title.error && <span className="validation-error-label">{title.error}</span>}
              </div>
            }/>
            <Field name="videoUrl" component={videoUrl =>
              <div className="form-group">
                <label className="display-block">Video url</label>
                <input type="text" name="videoUrl" className="form-control" {...videoUrl} placeholder="Enter Video Url ..." />
                {videoUrl.touched && videoUrl.error && <span className="validation-error-label">{videoUrl.error}</span>}
              </div>
            }/>
            <Field name="thumbnail" component={thumbnail =>
              <div className="form-group">
                <div>
                  <label>Upload thumbnail</label>
                </div>
                <Dropzone
                        {...thumbnail}
                        multiple={false} accept="image/*"
                        accept="image/*" className="action btn bg-warning upload-btn"
                        multiple={false} onDrop={(files)=>this.onDrop(files, thumbnail)}>
                  <div>Drop thumbnail here, or click to select file to upload.</div>
                </Dropzone>
                {thumbnail.error && <label className="validation-error-label">{thumbnail.error}</label>}
                {this.state.isUploadingImage && <span style={{marginLeft: 5}} className="label bg-blue">Uploading</span>}
                {thumbnail.value && <img src={thumbnail.value} width="50" height="50"></img>}
              </div>
            }/>
            <Field name="description" component={description =>
              <div className="form-group">
                <label className="display-block">Short Description</label>
                <textarea cols="5" rows="5" className="form-control" placeholder="Enter text ..." {...description}></textarea>
              </div>
            }/>
            <Field name="content" component={content =>
              <div className="form-group">
                <label>Content</label>
                <TextEditor {...content}/>
              </div>
            }/>
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
