import React, { Component, PropTypes } from 'react';
import { QuestionView, AnswerForm, AnswersList } from 'components';
import Helmet from 'react-helmet';
import {withQuestion, withUserId} from 'hoc';
import {add} from 'redux/modules/answer/create';
import {voteUp as questionVoteUp, voteDown as questionVoteDown} from 'redux/modules/question/voting';
import {voteUp as answerVoteUp, voteDown as answerVoteDown} from 'redux/modules/answer/voting';
import {favorite, unfavorite} from 'redux/modules/question/favorite';
import {connect} from 'react-redux';
@connect(null, { add, questionVoteUp, questionVoteDown, answerVoteUp, answerVoteDown, favorite, unfavorite })
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
  };

  state = {
    saved: false
  }
  static pageHeader = {}

  render() {
    const {question, userId} = this.props;
    return (
      <div className="container">
        <Helmet title="Question"/>
        <QuestionView onVoteUp={()=>this.props.questionVoteUp(question)}
                      onVoteDown={()=>this.props.questionVoteDown(question)}
                      onFavorite={()=>this.props.favorite(question)}
                      onUnfavorite={()=>this.props.unfavorite(question)}
                      question={question}/>
        <AnswersList onVoteUp={(answer)=>this.props.answerVoteUp(answer, question.get('shortId'))}
                     onVoteDown={(answer)=>this.props.answerVoteDown(answer, question.get('shortId'))}
                     order={question.getIn(['answers', 'order'])} entities={question.getIn(['answers', 'entities'])}/>
        {!this.state.saved
          ? <AnswerForm
          onSubmit={(model)=> this.props.add({
            ...model,
            authorId: userId,
            questionId: question.get('id'),
            winner: false
          }, question.get('shortId')).then(()=> this.setState({saved: true}))}/>
          : <div className="panel panel-flat">
          <div className="panel-heading">
            <div className="panel-title">
              <h3 className="text-success">saved</h3>
            </div>
          </div>
        </div>}
      </div>);
  }
}
