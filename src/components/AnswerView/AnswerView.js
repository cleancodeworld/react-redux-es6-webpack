import React from 'react';
import AuthorCardQAndA from './../AuthorCardQAndA/AuthorCardQAndA';
import VotingBar from './../VotingBar/VotingBar';
import CorrectAnswer from './CorrectAnswer/CorrectAnswer';

const AnswerView = ({answer, onVoteUp, onVoteDown}) => {
  return (<div>
      <div className="pull-left pt-10">
        <VotingBar onVoteUp={onVoteUp} onVoteDown={onVoteDown}/>
        <CorrectAnswer/>
      </div>
      <div className="ui-spinner pl-10 pt-20">
        <div dangerouslySetInnerHTML={(()=>({__html: answer.get('content')}))()}/>
      </div>
      <div className="row">
        <div className="col-md-4 pull-right">
          <AuthorCardQAndA createdAt={answer.get('createdAt')} author={answer.get('Author')}/>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default AnswerView;
