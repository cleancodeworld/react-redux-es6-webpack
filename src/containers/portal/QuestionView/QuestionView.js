import React, { Component, PropTypes } from 'react';
import { QuestionView as QV, AnswerForm } from 'components';
import Helmet from 'react-helmet';

export default class QuestionView extends Component {
  static propTypes = {
    course: PropTypes.object,
    lesson: PropTypes.object,
    params: PropTypes.object.isRequired
  };

  static pageHeader = {
    title: ' - View',
    boldTitle: 'Question'
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Question"/>
        <QV/>
        <AnswerForm/>
      </div>
    );
  }
}
