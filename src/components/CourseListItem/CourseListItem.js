import React from 'react';

const CourseListItem = ({course}) => {
  return (<div className="col-lg-3 col-sm-6">
      <div className="thumbnail">
        <div className="thumb">
          <img src={course.get('thumbnail')} alt=""/>
        </div>

        <div className="caption">
          <h6 className="no-margin"><a href="#" className="text-default">{course.get('name')}</a>
            <a href="#" className="text-muted">
              <i className="icon-three-bars pull-right"></i>
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
};
export default CourseListItem;
