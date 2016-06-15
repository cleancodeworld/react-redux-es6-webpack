import React, { Component, PropTypes } from 'react';
import { PageForm } from 'components';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { add as addPage } from 'redux/modules/page/create';
import {withCourse, withLesson} from 'hoc';

@connect(
  null,
  { addPage }
)

@withCourse
@withLesson
export default class LessonAdd extends Component {
  static propTypes = {
    course: PropTypes.object,
    lesson: PropTypes.object,
    addPage: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  static pageHeader = {
    title: ' - Create',
    boldTitle: 'Page'
  }

  render() {
    const {course, lesson} = this.props;
    return (
      <div>
        <Helmet title="Create Lesson"/>
        <PageForm
          onSubmit={ model => this.props.addPage(model, course, lesson)}/>
      </div>
    );
  }
}
