import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import Select from 'react-select';
import classnames from 'classnames';
import {TextEditor} from 'components';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import validate from './validate';
import { withCourseCategories } from 'hoc';
import config from 'config';

@reduxForm({
  form: 'CourseForm',
  validate,
})

@withCourseCategories
export default class CourseForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onUploadImageSuccess: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    categories: PropTypes.object,
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

  errorRender = (error) => {
    let res = <span/>;
    if (error) {
      res = (<div className="alert bg-danger alert-styled-left" role="alert">
        <strong>{error}</strong>
      </div> );
    }
    return res;
  }

  nameField = name =>
    <div>
      <input type="text" className="form-control" placeholder="Title" {...name.input} />
      {name.touched && name.error && <label className="validation-error-label">{name.error}</label>}
    </div>

  subtitleField = subtitle => <div>
    <input type="text" className="form-control"
           placeholder="e.g. A-Z guide to creating amazing images and clips using the newest version." {...subtitle.input} />
    {subtitle.touched && subtitle.error && <label className="validation-error-label">{subtitle.error}</label>}
  </div>

  descriptionField = description=> <TextEditor {...description.input}/>

  durationField = duration =>
    <div>
      <input type="text" className="form-control"
             placeholder="Duration in minutes (Numbers only)" {...duration.input} />
      {duration.touched && duration.error && <label className="validation-error-label">{duration.error}</label>}
    </div>

  render() {
    const {
      handleSubmit,
      submitting,
      error,
      categories,
      } = this.props;
    const { entities, order } = categories;
    return (
      <div className="panel panel-flat">
        <form onSubmit={handleSubmit} className="form-horizontal" autoComplete="off">
          <div className="panel panel-body">
            <h2 className="content-group-lg">Basic
            </h2>
            <p className="text-muted">Help Students find your course. <a href="#">Learn best Practices</a></p>
            {this.errorRender(error)}
            <div className="col-md-12">
              <div className="form-group">
                <div className="control-label">
                  Title
                </div>
                <Field name="name" component={this.nameField}/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <div className="control-label">
                  Subtitle
                </div>
                <Field name="subtitle" component={this.subtitleField}/>
                <a href={'//' + config.mainDomain + '/page/Course-Title-Quality-Standards/u2qrZT'}>Learn more about
                  title, subtitle</a>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <div className="control-label">
                  Thumbnail
                </div>
                <Field name="thumbnail" component={thumbnail =>
                  <div>
                    <Dropzone multiple={false} accept="image/*"
                              {...thumbnail.input}
                              accept="image/*" className="action btn bg-warning upload-btn"
                              disabled={this.state.isUploadingImage}
                              disableClick={this.state.isUploadingImage}
                              multiple={false} onDrop={(files)=>this.onDrop(files, thumbnail.input)}>
                      <div> {this.state.isUploadingImage ? 'Uploading... please wait' : 'Drop thumbnail here, or click to select file to upload.'} </div>
                    </Dropzone>
                    {thumbnail.error && <label className="validation-error-label">{thumbnail.error}</label>}
                    {!thumbnail.error && thumbnail.input.value && <img src={thumbnail.input.value} width="50" height="50"></img>}
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
                  {...language.input}
                  onBlur={() => {}}
                  onBlurResetsInput={false}
                  value={language.input.value}
                  searchable={false}
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
                  {...category.input}
                  onBlur={() => {}}
                  onBlurResetsInput={false}
                  value={category.input.value}
                  allowCreate
                  multi
                  newOptionCreator={input => ({
                    value: input.replace(/ /g, '-'),
                    label: input
                  })}
                  options={order.map(slug => ({value: entities.getIn([slug, 'slug']) || 'slug', label: entities.getIn([slug, 'category'])})).toJS()}/>
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
                      component={level=> <span className={classnames({checked: level.input.value === 'beginner'})}><input type="radio" {...level.input} value="beginner" className="styled" /></span>}
                    />
                  </div>
                  Beginner Level
                </label>

                <label className="radio-inline">
                  <div className="choice">
                    <Field
                      name="level"
                      component={level=> <span className={classnames({checked: level.input.value === 'intermediate'})}><input type="radio" {...level.input} value="intermediate" className="styled" /></span>}
                    />
                  </div>
                  Intermediate Level
                </label>

                <label className="radio-inline">
                  <div className="choice">
                    <Field
                      name="level"
                      component={level=> <span className={classnames({checked: level.input.value === 'expert'})}><input type="radio" {...level.input} value="expert" className="styled" /></span>}
                    />
                  </div>
                  Expert Level
                </label>

                <label className="radio-inline">
                  <div className="choice">
                    <Field
                      name="level"
                      component={level=> <span className={classnames({checked: level.input.value === 'all'})}><input type="radio" {...level.input} value="all" className="styled" /></span>}
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
                  component={this.descriptionField}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <div className="control-label">
                  Course Duration
                </div>
                <Field name="duration" component={this.durationField}/>
              </div>
            </div>
            <div className="col-md-12 text-right">
              <button type="submit" disabled={submitting || this.state.isUploadingImage} className="btn bg-blue">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
