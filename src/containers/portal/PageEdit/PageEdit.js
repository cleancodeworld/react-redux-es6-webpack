import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { PageForm } from 'components';
import { edit as editPage } from 'redux/modules/page/edit';
import {withPage, withLesson, withCourse} from 'hoc';


@withCourse
@withLesson
@withPage
@connect(
  null,
  { editPage }
)
export default class PageEdit extends Component {
  static propTypes = {
    page: PropTypes.object,
    lesson: PropTypes.object,
    course: PropTypes.object,
    editPage: PropTypes.func.isRequired,
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
    const {page, lesson, course} = this.props;
    return (
      <div>
        <Helmet title={`Edit Lesson: ${page.get('title')}`}/>
        <PageForm initialValues={page.toJS()}
                  onSubmit={ model => this.props.editPage({...model, title: model.title.trim()}, course, lesson, page).then(()=>this.setState({saved: true}))}
                  submitStatus={this.state.saved}/>
      </div>
    );
  }
}
