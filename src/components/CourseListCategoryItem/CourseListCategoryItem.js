import React from 'react';
import {Link} from 'react-router';

const CourseListCategoryItem = ({category, isActive}) => {
  const liProps = {};
  if (isActive) {
    liProps.className = 'active';
  }
  return (
    <li {...liProps}><Link to={`/courses/${category.slug}`}><span>{category.name}</span></Link></li>
  );
};
export default CourseListCategoryItem;
