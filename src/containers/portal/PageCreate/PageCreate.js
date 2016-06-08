import React, { Component, PropTypes } from 'react';
import { PageForm } from 'components';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { add as addLesson } from 'redux/modules/lesson/create';
import {withCourse} from 'hoc';

@connect(
  null,
  { addLesson }
)

@withCourse

export default class LessonAdd extends Component {
  static propTypes = {
    course: PropTypes.object,
    addLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  static pageHeader = {
    title: ' - Create',
    boldTitle: 'Lesson'
  }

  render() {
    const {courseName} = this.props.params;
    const {course} = this.props;

    return (
      <div>
        <Helmet title="Create Lesson"/>
        <PageForm
          onSubmit={ model => this.props.addLesson(model, course.get('id'), courseName)}/>
      </div>
    );
  }
}
