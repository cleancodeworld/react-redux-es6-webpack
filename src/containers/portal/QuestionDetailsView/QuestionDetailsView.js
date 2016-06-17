import React, { Component, PropTypes } from 'react';
import { QuestionView, AnswerForm, AnswersList } from 'components';
import Helmet from 'react-helmet';
import {withQuestion} from 'hoc';
@withQuestion
export default class QuestionDetailsView extends Component {
  static propTypes = {
    question: PropTypes.object,
  };

  static pageHeader = {}

  render() {
    const {question} = this.props;
    return (
      <div className="container">
        <Helmet title="Question"/>
        <QuestionView question={question}/>
        <AnswersList/>
        <AnswerForm/>
      </div>
    );
  }
}
