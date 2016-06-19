import React from 'react';
import AuthorCardQAndA from './../AuthorCardQAndA/AuthorCardQAndA';

const QuestionView = ({question})=> {
  // TODO: camelcase (Author)
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
          <div className="col-md-offset-8 col-md-4">
            <AuthorCardQAndA createdAt={question.get('createdAt')} author={question.get('Author')}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
