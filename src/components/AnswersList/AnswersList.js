import React from 'react';
import AnswerView from './components/AnswerView/AnswerView';

const AnswersList = ()=> {
  return (<div className="panel panel-flat">
      <div className="panel-heading">
        <h5 className="panel-title">2 Answers</h5>
      </div>
      <div className="panel-body">
        <AnswerView/>
        <AnswerView/>
      </div>
    </div>
  );
};

export default AnswersList;
