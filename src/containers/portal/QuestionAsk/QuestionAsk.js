import React, { Component, PropTypes } from 'react';
import { QuestionForm } from 'components';
import Helmet from 'react-helmet';


export default class QuestionAsk extends Component {
  static propTypes = {
    course: PropTypes.object,
    lesson: PropTypes.object,
    params: PropTypes.object.isRequired
  };

  static pageHeader = {
    title: ' - Ask',
    boldTitle: 'Question'
  }

  render() {
    return (
      <div>
        <Helmet title="Create Lesson"/>
        <QuestionForm
          onSubmit={ () => ({})}/>
      </div>
    );
  }
}
