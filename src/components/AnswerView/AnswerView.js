import React from 'react';
import AuthorCardQAndA from './../AuthorCardQAndA/AuthorCardQAndA';
import VotingBar from './../VotingBar/VotingBar';
import WinnerAnswer from './WinnerAnswer/WinnerAnswer';
import RemoveButton from './RemoveButton/RemoveButton';

const AnswerView = ({answer, onVoteUp, onVoteDown, onWinner, onRemove, userId}) => {
  return (<div>
      <div className="pull-left pt-10">
        <VotingBar onVoteUp={onVoteUp} onVoteDown={onVoteDown} votes={answer.get('votes')}/>
        <WinnerAnswer onWinner={onWinner} isWinner={answer.get('winner')}/>
      </div>
      <div className="ui-spinner pl-10 pt-20">
        <div dangerouslySetInnerHTML={(()=>({__html: answer.get('content')}))()}/>
      </div>
      <div className="row">
        <div className="col-md-4">
          {userId === answer.getIn(['author', 'id'])
            ? <RemoveButton answer={answer}
                            onRemove={()=> onRemove(answer)}/>
            : <span/>}
        </div>
        <div className="col-md-4 pull-right">
          {answer.get('author') && <AuthorCardQAndA createdAt={answer.get('createdAt')} author={answer.get('author')}/>}
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default AnswerView;
