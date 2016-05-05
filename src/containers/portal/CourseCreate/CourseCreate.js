import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { connect } from 'react-redux';
import { create as courseCreate } from 'redux/modules/course/create';

@connect(null, { courseCreate })
export default class CourseCreate extends Component {

  static propTypes = {
    courseCreate: PropTypes.func,
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <CourseForm onSubmit={ model => this.props.courseCreate(model)}/>
      </div>
    );
  }
}
