import React from 'react';
import {Link} from 'react-router';
import PriceDisplay from '../../PriceDisplay/PriceDisplay';

const Guest = ({course, onClickLoginRequiredLink}) => {
  const courseImage = course.get('thumbnail');
  const coursePlaceholderImage = '/assets/images/placeholder.jpg';
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="thumbnail">
        <Link to={'/author/course/' + course.get('slug')} className="text-default" onClick={onClickLoginRequiredLink}>
          <div className="thumb-wrapper"
               style={{ backgroundImage: 'url(' + coursePlaceholderImage + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="thumb"
                 style={{ backgroundImage: 'url(' + courseImage + ')', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%' }}>
              <img src={courseImage} alt="Course Thumbnail" style={{ display: 'none' }}/>
              <div className="caption-overflow">
                <span>
                  <a href="javascript:void(0)" onClick={onClickLoginRequiredLink}
                    className="btn border-white text-white btn-flat btn-icon btn-rounded ml-5"><i
                    className="icon-heart6"></i></a>
                </span>
              </div>
            </div>
          </div>
        </Link>
        <div className="caption">
          <Link to={'/course/' + course.get('slug')} className="text-default">
            <h6 className="no-margin-top text-semibold">{course.get('name')}</h6>
          </Link>
          <hr className="no-margin-top mb-10"/>
          <div className="clearfix">
            <div className="pull-left">
              Price <strong className="btn-block clearfix">
              <PriceDisplay coursePrice={course.get('coursePrice')}/></strong>
            </div>
          </div>
          <hr className="no-margin-top mb-10 mt-10"/>
          <div className="media no-margin-top">
            <div className="media-left media-middle">
              <a href="#">
                <img src="/assets/images/placeholder.jpg" className="img-responsive" alt=""/>
              </a>
            </div>
            <div className="media-body">
              <div className="media-heading text-semibold">{course.get('authorId')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Guest;
