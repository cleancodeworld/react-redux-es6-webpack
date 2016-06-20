import React from 'react';
import AuthorCardQAndA from './../../../AuthorCardQAndA/AuthorCardQAndA';
import VotingBar from './../../../VotingBar/VotingBar';

const AnswerView = ({answer}) => {
  return (<div>
      <div className="pull-left pt-10">
        <VotingBar/>
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
