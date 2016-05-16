import React from 'react';
import {Link} from 'react-router';

const CourseListItem = ({course}) => {
  const courseImage = course.get('thumbnail');
  const coursePlaceholderImage = '/assets/images/placeholder.jpg';
  // const currency = '$';
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="thumbnail">
        <Link to={'/author/course/' + course.get('slug')} className="text-default">
          <div className="thumb-wrapper"
               style={{ backgroundImage: 'url(' + coursePlaceholderImage + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="thumb"
                 style={{ backgroundImage: 'url(' + courseImage + ')', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%' }}>
              <img src={courseImage} alt="Course Thumbnail" style={{ display: 'none' }}/>
            </div>
          </div>
          <div className="caption">
            <h6 className="no-margin-top text-semibold">{course.get('name')}</h6>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default CourseListItem;
