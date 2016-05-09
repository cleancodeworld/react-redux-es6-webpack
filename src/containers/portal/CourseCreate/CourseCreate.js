import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { connect } from 'react-redux';
import { create as courseCreate } from 'redux/modules/course/create';

@connect(
  state => ({ auth: state.auth }),
  { courseCreate }
)
export default class CourseCreate extends Component {

  static propTypes = {
    auth: PropTypes.object,
    courseCreate: PropTypes.func,
  };

  render() {
    const initialFormValues = {
      level: 'all',
      language: 'English',
      category: 'General',
      duration: 500,
      thumbnail: '',
      authorId: this.props.auth.get('userId')
    };
    return (
      <div>
        <Helmet title="Home"/>
        <CourseForm initialValues={initialFormValues} onSubmit={ model => this.props.courseCreate(model)}/>
      </div>
    );
  }
}
