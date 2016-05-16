import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

const CourseListItem = ({course, addToWishList, isWishListItem}) => {
  const courseImage = course.get('thumbnail');
  const coursePlaceholderImage = '/assets/images/placeholder.jpg';
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="thumbnail">
        <div className="thumb-wrapper"
             style={{ backgroundImage: 'url(' + coursePlaceholderImage + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="thumb"
               style={{ backgroundImage: 'url(' + courseImage + ')', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%' }}>
            <img src={courseImage} alt="Course Thumbnail" style={{ display: 'none' }}/>
            <div className="caption-overflow">
            <span>
              <a href="javascript:void(0)" onClick={()=> addToWishList(course.get('name'))}
                 className="btn border-white text-white btn-flat btn-icon btn-rounded ml-5"><i
                className={classNames({
                  'icon-heart6': !isWishListItem,
                  'icon-heart5': isWishListItem,
                }) }></i></a>
            </span>
            </div>
          </div>
        </div>
        <div className="caption">
          <Link to={'/author/course/' + course.get('slug')} className="text-default">
            <h6 className="no-margin-top text-semibold">{course.get('name')}</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CourseListItem;
