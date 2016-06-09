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
    return (
      <div>
        <Helmet title="Create Lesson"/>
        <PageForm
          onSubmit={ model => alert(JSON.stringify(model, null, 4))}/>
      </div>
    );
  }
}
