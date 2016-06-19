import React, { Component, PropTypes } from 'react';
import { QuestionView, AnswerForm, AnswersList } from 'components';
import Helmet from 'react-helmet';
import {withQuestion, withUserId} from 'hoc';
import {add} from 'redux/modules/answer/create';
import {connect} from 'react-redux';
@connect(null, { add })
@withQuestion
@withUserId
export default class QuestionDetailsView extends Component {
  static propTypes = {
    question: PropTypes.object,
    userId: PropTypes.string,
    add: PropTypes.func,

  };

  static pageHeader = {}

  render() {
    const {question, userId} = this.props;
    return (
      <div className="container">
        <Helmet title="Question"/>
        <QuestionView question={question}/>
        <AnswersList order={question.getIn(['answers', 'order'])} entities={question.getIn(['answers', 'entities'])}/>
        <AnswerForm
          onSubmit={(model)=> this.props.add({
            ...model,
            authorId: userId,
            questionId: question.get('id'),
            winner: false
          }, question.get('shortId'))}/>
      </div>
    );
  }
}
