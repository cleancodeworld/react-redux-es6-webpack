import React from 'react';
import {Link} from 'react-router';

const CourseListItem = ({course, author}) => {
  const courseImage = course.get('thumbnail');
  const coursePlaceholderImage = '/assets/images/placeholder.jpg';
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="thumbnail">
        <div className="thumb-wrapper" style={{ backgroundImage: 'url(' + coursePlaceholderImage + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="thumb" style={{ backgroundImage: 'url(' + courseImage + ')', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%' }}>
            <img src={courseImage} alt="Course Thumbnail" style={{ display: 'none' }}/>
          </div>
        </div>
        <div className="caption">
          <h6 className="no-margin-top text-semibold"><Link to={'/author/course/' + course.get('slug')} className="text-default">{course.get('name')}</Link></h6>
          <hr className="no-margin-top mb-10"/>
          <div className="media no-margin-top">
            <div className="media-left media-middle">
              <a href="#">
                <img src={'https://placehold.it/40x40'} className="img-responsive" alt=""/>
              </a>
            </div>
            <div className="media-body">
              <div className="media-heading text-semibold">{author.get('name')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseListItem;
