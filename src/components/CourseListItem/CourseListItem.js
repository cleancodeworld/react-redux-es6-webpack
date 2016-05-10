import React from 'react';
import {Link} from 'react-router';

const CourseListItem = ({course, author}) => {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="thumbnail">
        <div className="thumb">
          <img src={course.get('thumbnail')} alt="Course Thumbnail"/>
        </div>
        <div className="caption">
          <h6 className="no-margin-top text-semibold"><Link to={'/author/course/' + course.get('Slug')} className="text-default">{course.get('name')}</Link></h6>
          <hr className="no-margin-top mb-10"/>
          <div className="clearfix">
            <div className="pull-left">
              Price <b className="clearfix">$35</b>
            </div>
            <div className="pull-right">
              <b>216</b> Reviews
              <div className="star">
                <i className="icon-star-full2 text-size-base text-warning-300"></i>
                <i className="icon-star-full2 text-size-base text-warning-300"></i>
                <i className="icon-star-full2 text-size-base text-warning-300"></i>
                <i className="icon-star-full2 text-size-base text-warning-300"></i>
                <i className="icon-star-half text-size-base text-warning-300"></i>
              </div>
            </div>
          </div>
          <hr className="no-margin-top mb-10 mt-10"/>
          <div className="media no-margin-top">
            <div className="media-left media-middle">
              <a href="#">
                <img src="assets/images/placeholder.jpg" className="img-responsive" alt=""/>
              </a>
            </div>
            <div className="media-body">
              <div className="media-heading text-semibold">{author.get('name')}</div>
              <span className="text-muted ellipsis">Best-selling Instructor, Game </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseListItem;
