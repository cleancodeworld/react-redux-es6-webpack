import React from 'react';
import AnswerView from './components/AnswerView/AnswerView';

const AnswersList = ({order, entities})=> {
  return (<div className="panel panel-flat">
      <div className="panel-heading">
        <h5 className="panel-title">Answers</h5>
      </div>
      <div className="panel-body">
        {order.map(answerId=> <AnswerView key={answerId} answer={entities.get(answerId)}/>)}
      </div>
    </div>
  );
};

export default AnswersList;
