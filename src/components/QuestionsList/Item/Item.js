import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

const Item = ({question})=> {
  const createdAt = question.get('createdAt');
  return (<li className="media">
    <div className="media-left width-200 pr-5">
      <div className="heading-btn-group">
        <a href="#" className="btn text-muted text-size-small p-5 pl-10 pr-10 legitRipple">
          <div className="counts">0</div>
          <span>votes</span></a>
        <a href="#" className="btn text-muted text-size-small p-5 pl-10 pr-10 legitRipple">
          <div className="counts">0</div>
          <span>answers</span></a>
        <a href="#" className="btn text-muted text-size-small p-5 pl-10 pr-10 legitRipple">
          <div className="counts">1</div>
          <span>views</span></a>
      </div>
    </div>

    <div className="media-body pl-10">
      <h6 className="media-heading mb-5">
        <Link to={`question/${question.get('shortId')}/${question.get('slug')}`}>{question.get('title')}
        </Link>
      </h6>
      <div className="content-group no-margin clearfix">
        <div className="pull-left">
          {question.get('tags').split(',').map(tag=> <button type="button"
                                                             className="btn btn-default btn-xs pt-5 pb-5 legitRipple">
            {tag}
          </button>)}

        </div>
        <div className="pull-right mt-5">
          <a href="#" className="text-muted">asked {moment(createdAt).fromNow()}</a>
          <a href="#">Александр Юрьевич Ком</a>
          1
        </div>
      </div>
    </div>
  </li>);
};
export default Item;
