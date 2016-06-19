import React from 'react';
import AuthorCardQAndA from './../../../AuthorCardQAndA/AuthorCardQAndA';

const AnswerView = ({answer}) => {
  return (<div>
      <div dangerouslySetInnerHTML={(()=>({__html: answer.get('content')}))()}/>
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
