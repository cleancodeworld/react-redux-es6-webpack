import React from 'react';
import {Link} from 'react-router';

const CourseListPublicItem = ({course}) => {
  const courseImage = course.get('thumbnail');
  const coursePlaceholderImage = '/assets/images/placeholder.jpg';
  const price = course.get('coursePrice');
  const currency = '$';
  const priceValue = price.get('price');
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="thumbnail">
        <div className="thumb-wrapper" style={{ backgroundImage: 'url(' + coursePlaceholderImage + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="thumb" style={{ backgroundImage: 'url(' + courseImage + ')', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%' }}>
            <img src={courseImage} alt="Course Thumbnail" style={{ display: 'none' }}/>
            <div className="caption-overflow">
              <span>
                <a href="#" className="btn border-white text-white btn-flat btn-icon btn-rounded"><i className="icon-plus3"></i></a>
                <a href="#" className="btn border-white text-white btn-flat btn-icon btn-rounded ml-5"><i className="icon-heart5"></i></a>
              </span>
            </div>
          </div>
        </div>
        <div className="caption">
          <h6 className="no-margin-top text-semibold"><Link to={'/course/' + course.get('slug')} className="text-default">{course.get('name')}</Link></h6>
          <hr className="no-margin-top mb-10"/>
          <div className="clearfix">
            <div className="pull-left">
              Price <b className="clearfix">{
                priceValue > 0 ? currency + '' + priceValue : 'Free'
              }</b>
            </div>
          </div>
          <hr className="no-margin-top mb-10 mt-10"/>
          <div className="media no-margin-top">
            <div className="media-left media-middle">
              <a href="#">
                <img src={'https://placehold.it/40x40'} className="img-responsive" alt=""/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseListPublicItem;
