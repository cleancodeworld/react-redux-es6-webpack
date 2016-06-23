import React from 'react';
import AnswerView from './../AnswerView/AnswerView';

const AnswersList = ({order, entities, onVoteUp, onVoteDown, onWinner, onRemove, userId})=> {
  return (<div className="panel panel-flat">
      <div className="panel-heading">
        <h5 className="panel-title">Answers</h5>
      </div>
      <div className="panel-body">
        {order
          ? order.map(answerId=> <AnswerView onVoteUp={()=>onVoteUp(entities.get(answerId))}
                                             onVoteDown={()=>onVoteDown(entities.get(answerId))}
                                             onWinner={()=>onWinner(entities.get(answerId))}
                                             onRemove={()=>onRemove(entities.get(answerId))}
                                             key={answerId}
                                             userId={userId}
                                             answer={entities.get(answerId)}/>)
          : <span>No answers</span>}
      </div>
    </div>
  );
};

export default AnswersList;
