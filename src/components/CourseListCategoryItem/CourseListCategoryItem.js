import React from 'react';
import {Link} from 'react-router';

const CourseListCategoryItem = ({category}) => {
  return (
    <li><Link to={`/courses/${category.slug}`}><span>{category.name}</span></Link></li>
  );
};
export default CourseListCategoryItem;
