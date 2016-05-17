import React from 'react';
import {Link} from 'react-router';

const CourseListCategoryItem = ({category, isActive}) => {
  const liProps = {};
  if (isActive) {
    liProps.className = 'active';
  }
  return (
    <li {...liProps}><Link to={`/courses/${category.get('slug')}`}><span>{category.get('category')}</span></Link></li>
  );
};
export default CourseListCategoryItem;
