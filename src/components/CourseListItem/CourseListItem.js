import React, {PropTypes} from 'react';
import {
  Guest, Owner, User
} from './types/index';

const CourseListItem = (props, context) => {
  const {course} = props;
  const coursePrice = course.get('coursePrice');
  let price = 'Free';
  if (coursePrice.get('paid')) {
    if (coursePrice.get('currency').toLowerCase() === 'euro') {
      price = '€';
    } else {
      price = '$';
    }
    price += coursePrice.get('price');
  }
  if (course.get('authorId') === context.user.get('userId')) {
    return <Owner price={price} {...props}/>;
  } else if (context.user.get('userId')) {
    return <User price={price} {...props}/>;
  }
  return <Guest price={price} {...props}/>;
};

CourseListItem.contextTypes = {
  user: PropTypes.object,
};

CourseListItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseListItem;
