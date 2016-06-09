import React, { Component, PropTypes } from 'react';
import { PageForm } from 'components';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { add as addLesson } from 'redux/modules/lesson/create';
import {withCourse, withLesson} from 'hoc';

@connect(
  null,
  { addLesson }
)

@withCourse
@withLesson
export default class LessonAdd extends Component {
  static propTypes = {
    course: PropTypes.object,
    lesson: PropTypes.object,
    addLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  static pageHeader = {
    title: ' - Create',
    boldTitle: 'Lesson'
  }

  render() {
    const {course, lesson} = this.props;
    return (
      <div>
        <Helmet title="Create Lesson"/>
        <PageForm
          onSubmit={ model => this.props.addLesson(model, course, lesson)}/>
      </div>
    );
  }
}
