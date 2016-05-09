import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import Select from 'react-select';
import classnames from 'classnames';
import {TextEditor} from 'components';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

@connect(({auth}) => ({
  initialValues: {
    level: 'all',
    language: 'English',
    category: 'General',
    duration: 500,
    thumbnail: '',
    authorId: auth.get('userId')
  }
}))
@reduxForm({
  form: 'CourseForm',
})
export default class CourseForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string
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
        alert('Uploaded successfully');
        field.onChange(body.url);
      }
    });
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
                <Field name="name" component={name =>
                <div>
                  <input type="text" className="form-control" placeholder="Title" {...name} />
                  {name.touched && name.error && <label className="validation-error-label">{name.error}</label>}
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
            <div className="col-md-12">
              <div className="form-group">
                <div className="control-label">
                  Thumbnail
                </div>
                <Field name="thumbnail" component={thumbnail =>
                  <div>
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
                  options={['English', 'Spanish', 'Dutch', 'French'].map( value => ({ value: value, label: value}))}
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
                  options={['General', 'Languages', 'Programming', 'Health'].map( value => ({ value: value, label: value}))}
                  />
                  {category.touched && category.error && <label className="validation-error-label">{category.error}</label>}
                </div>
              }/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="control-label">Instructional Level</label>
                <p className="text-muted">Specify the level of the course content to give students a better understading
                  of whether this course is right for them.</p>

                <label className="radio-inline">
                  <div className="choice">
                    <Field
                      name="level"
                      component={level=> <span className={classnames({checked: level.value === 'beginner'})}><input type="radio" {...level} value="beginner" className="styled" /></span>}
                    />
                  </div>
                  Beginner Level
                </label>

                <label className="radio-inline">
                  <div className="choice">
                    <Field
                      name="level"
                      component={level=> <span className={classnames({checked: level.value === 'intermediate'})}><input type="radio" {...level} value="intermediate" className="styled" /></span>}
                    />
                  </div>
                  Intermediate Level
                </label>

                <label className="radio-inline">
                  <div className="choice">
                    <Field
                      name="level"
                      component={level=> <span className={classnames({checked: level.value === 'expert'})}><input type="radio" {...level} value="expert" className="styled" /></span>}
                    />
                  </div>
                  Expert Level
                </label>

                <label className="radio-inline">
                  <div className="choice">
                    <Field
                      name="level"
                      component={level=> <span className={classnames({checked: level.value === 'all'})}><input type="radio" {...level} value="all" className="styled" /></span>}
                    />
                  </div>
                  All Levels
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <div className="control-label">
                  Description
                </div>
                <Field
                  name="description"
                  component={description=> <TextEditor {...description}/>}
                />
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