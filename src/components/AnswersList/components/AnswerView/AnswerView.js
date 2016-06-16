import React from 'react';

const AnswerView = ()=> {
  return (<div>
      <div>
        Answer
      </div>
      <div className="row">
        <div className="col-md-4 pull-right">
          <blockquote className="no-margin no-padding-top">
            <header className="mb-5">asked 14 hours ago</header>
            <img src="http://placehold.it/40x40" alt="" className="mr-10"/>
            <a href="#">momotaro</a>
            <div className="content-group no-margin">28 &nbsp;<span className="status-mark bg-danger"></span> 5</div>
          </blockquote>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default AnswerView;
