import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { LessonForm } from 'components';
import { editLesson } from 'redux/modules/lesson/edit';
import {withLesson, withCourse} from 'hoc';

@connect(
  null,
  { editLesson }
)

@withCourse
@withLesson

export default class LessonEdit extends Component {
  static propTypes = {
    lesson: PropTypes.object,
    course: PropTypes.object,
    editLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    saved: false
  }

  static pageHeader = {
    title: ' - Edit',
    boldTitle: 'Lesson'
  }

  render() {
    const {params: { courseName, lessonName }, lesson} = this.props;
    return (
      <div>
        <Helmet title={`Edit Lesson: ${lesson.get('title')}`}/>
        <LessonForm initialValues={lesson.toJS()}
                    onSubmit={ model => this.props.editLesson({...model, title: model.title.trim()}, lesson.get('courseId'), courseName, lessonName).then(()=>this.setState({saved: true}))}
                    submitStatus={this.state.saved}/>
      </div>
    );
  }
}
