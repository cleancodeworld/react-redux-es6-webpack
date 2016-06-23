import React, { Component, PropTypes } from 'react';
import { QuestionView, AnswerForm, AnswersList, LoginForm} from 'components';
import Helmet from 'react-helmet';
import {withQuestion, withUserId} from 'hoc';
import {add} from 'redux/modules/answer/create';
import {voteUp as questionVoteUp, voteDown as questionVoteDown} from 'redux/modules/question/voting';
import {voteUp as answerVoteUp, voteDown as answerVoteDown} from 'redux/modules/answer/voting';
import {remove as removeAnswer} from 'redux/modules/answer/remove';

import {winner as answerWinner} from 'redux/modules/answer/winner';
import {favorite, unfavorite} from 'redux/modules/question/favorite';
import { userLogin } from 'redux/modules/auth';
import {connect} from 'react-redux';

@connect(null, {
  add,
  questionVoteUp,
  questionVoteDown,
  answerVoteUp,
  answerVoteDown,
  favorite,
  unfavorite,
  answerWinner,
  userLogin,
  removeAnswer,
})
@withQuestion
@withUserId
export default class QuestionDetailsView extends Component {
  static propTypes = {
    question: PropTypes.object,
    userId: PropTypes.string,
    add: PropTypes.func,
    questionVoteUp: PropTypes.func,
    questionVoteDown: PropTypes.func,
    answerVoteUp: PropTypes.func,
    answerVoteDown: PropTypes.func,
    favorite: PropTypes.func,
    unfavorite: PropTypes.func,
    answerWinner: PropTypes.func,
    removeAnswer: PropTypes.func,
    userLogin: PropTypes.func,
  };

  state = {
    saved: false
  }
  static pageHeader = {}

  newAnswer(question, userId) {
    let res;
    if (this.state.saved) {
      res = (<div className="panel panel-flat">
        <div className="panel-heading">
          <div className="panel-title">
            <h3 className="text-success">Your answer saved</h3>
          </div>
        </div>
      </div>);
    } else if (userId) {
      res =
        (<AnswerForm
          onSubmit={(model)=> this.props.add({
            ...model,
            authorId: userId,
            questionId: question.get('id'),
            winner: false
          }, question.get('shortId')).then(()=> this.setState({saved: true}))}/>);
    } else {
      res = (<LoginForm onSubmit={ model => this.props.userLogin(model, false)}/>);
    }
    return res;
  }

  render() {
    const {question, userId} = this.props;
    return (
      <div className="container">
        <Helmet title="Question"/>
        <QuestionView onVoteUp={()=>this.props.questionVoteUp(question, userId)}
                      onVoteDown={()=>this.props.questionVoteDown(question, userId)}
                      onFavorite={()=>this.props.favorite(question, userId)}
                      onUnfavorite={()=>this.props.unfavorite(question, userId)}
                      userId={userId}
                      question={question}/>
        <AnswersList onVoteUp={(answer)=>this.props.answerVoteUp(answer, question.get('shortId'), userId)}
                     onVoteDown={(answer)=>this.props.answerVoteDown(answer, question.get('shortId'), userId)}
                     onWinner={(answer)=>this.props.answerWinner(answer, question.get('shortId'), userId)}
                     onRemove={(answer)=>this.props.removeAnswer(answer, question, userId)}
                     order={question.getIn(['answers', 'order'])} entities={question.getIn(['answers', 'entities'])}
                     userId={userId}/>
        {this.newAnswer(question, userId)}

      </div>);
  }
}
