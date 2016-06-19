import React from 'react';

const QuestionView = ({question})=> {
  return (<div className="panel panel-flat">
      <div className="panel-heading">
        <h5 className="panel-title">
          {question.get('title')}
        </h5>
      </div>

      <div className="panel-body">
        <div dangerouslySetInnerHTML={(()=>({__html: question.get('content')}))()}>
        </div>

        <div className="content-group">
          {
            question.get('tags').split(',').map(tag=> {
              return (<button key={tag} type="button" className="btn btn-default btn-sm legitRipple"> {tag} </button>);
            })
          }
        </div>

        <div className="row">
          <div className="col-md-4">
            <a title="short permalink to this question" href="#">share</a>
            <span className="lsep">|</span>
            <a title="" href="#">improve this question</a>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <blockquote className="no-margin no-padding-top">
              <header className="mb-5">asked 14 hours ago</header>
              <img src="http://placehold.it/40x40" alt="" className="mr-10"/>
              <a href="#">momotaro</a>
              <div className="content-group no-margin">28 &nbsp;<span className="status-mark bg-danger"></span> 5</div>
            </blockquote>
          </div>
        </div>
        <hr/>
        <ol>
          <li>
            Comment
            <div className="media-annotation display-block mt-5 text-right">
              <span className="ml-20">14 hours ago <a href="#"><i
                className="icon-pin-alt position-right text-muted"></i></a></span>
              <span className="ml-20">Blindman67 <a href="#"><i className="icon-user position-right text-muted"></i></a></span>
            </div>
          </li>
        </ol>
        <hr/>
        <h6 className="text-semibold no-margin"><a href="#"><i className="icon-pencil7 position-left"></i> Add a comment</a>
        </h6>
      </div>
    </div>
  );
};

export default QuestionView;
