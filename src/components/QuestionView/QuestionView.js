import React from 'react';
import AuthorCardQAndA from './../AuthorCardQAndA/AuthorCardQAndA';
import VotingBar from './../VotingBar/VotingBar';
import Favorite from './Favorite/Favorite';

const QuestionView = ({question, onVoteUp, onVoteDown, onFavorite, onUnfavorite})=> {
  // TODO: camelcase (Author)
  return (<div className="panel panel-flat">
      <div className="panel-heading">
        <h5 className="panel-title">
          {question.get('title')}
        </h5>
      </div>

      <div className="panel-body">
        <div className="pull-left pt-10">
          <VotingBar onVoteUp={onVoteUp} onVoteDown={onVoteDown}/>
          <Favorite onFavorite={onFavorite} onUnfavorite={onUnfavorite}/>
        </div>
        <div className="ui-spinner pl-10 pt-20">
          <div dangerouslySetInnerHTML={(()=>({__html: question.get('content')}))()}>
          </div>
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
            <a title="" href="#">improve this question</a>
          </div>
          <div className="col-md-4 pull-right">
            <AuthorCardQAndA createdAt={question.get('createdAt')} author={question.get('Author')}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
