import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { load, edit } from 'redux/modules/course/edit';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    const promises = [];
    promises.push(dispatch(load(params.courseName)));
    return Promise.all(promises);
  }
}])
@connect(
  ({courseEdit}) => ({
    course: courseEdit.get('course'),
    submitStatus: courseEdit.get('submitSuccess'),
  }),
  { edit }
)
export default class CourseEdit extends Component {

  static propTypes = {
    course: PropTypes.object.isRequired,
    edit: PropTypes.func,
    params: PropTypes.object.isRequired,
    submitStatus: PropTypes.bool,
  };

  render() {
    const {courseName} = this.props.params;
    const {submitStatus} = this.props;
    let course = this.props.course;
    if (typeof course.toJS !== 'undefined') {
      course = course.toJS();
    }
    return (
      <div>
        <Helmet title="Home"/>
        <CourseForm initialValues={course} submitStatus={submitStatus} onSubmit={model => this.props.edit(model, courseName)}/>
      </div>
    );
  }
}
