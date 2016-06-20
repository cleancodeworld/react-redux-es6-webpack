import React, { Component, PropTypes } from 'react';
import { QuestionView, AnswerForm, AnswersList } from 'components';
import Helmet from 'react-helmet';
import {withQuestion, withUserId} from 'hoc';
import {add} from 'redux/modules/answer/create';
import {voteUp, voteDown} from 'redux/modules/question/voting';
import {favorite, unfavorite} from 'redux/modules/question/favorite';
import {connect} from 'react-redux';
@connect(null, { add, voteUp, voteDown, favorite, unfavorite })
@withQuestion
@withUserId
export default class QuestionDetailsView extends Component {
  static propTypes = {
    question: PropTypes.object,
    userId: PropTypes.string,
    add: PropTypes.func,
    voteUp: PropTypes.func,
    voteDown: PropTypes.func,
    favorite: PropTypes.func,
    unfavorite: PropTypes.func,
  };

  static pageHeader = {}

  render() {
    const {question, userId} = this.props;
    return (
      <div className="container">
        <Helmet title="Question"/>
        <QuestionView onVoteUp={()=>this.props.voteUp()}
                      onVoteDown={()=>this.props.voteDown()}
                      onFavorite={()=>this.props.favorite()}
                      onUnfavorite={()=>this.props.unfavorite()}
                      question={question}/>
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
