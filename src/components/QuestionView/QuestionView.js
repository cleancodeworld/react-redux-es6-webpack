import React from 'react';
import AuthorCardQAndA from './../AuthorCardQAndA/AuthorCardQAndA';
import VotingBar from './../VotingBar/VotingBar';
import Favorite from './Favorite/Favorite';
import {Link} from 'react-router';

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
          <VotingBar onVoteUp={onVoteUp} onVoteDown={onVoteDown} votes={question.get('votes')}/>
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
            <Link to={`/question/${question.get('shortId')}/${question.get('slug')}/edit`}>improve this question</Link>
          </div>
          <div className="col-md-4 pull-right">
            <AuthorCardQAndA createdAt={question.get('createdAt')} author={question.get('author')}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
