import React from 'react';
import {Link} from 'react-router';

const LessonListItem = ({lesson, courseName}) => {
  return (
    <tr>
      <td className="col-md-6 col-sm-6">{lesson.get('title')}</td>
      <td className="col-md-3 col-sm-3">{lesson.get('CreatedAt')}</td>
      <td className="col-md-3 col-sm-3 text-center">
        <ul className="icons-list">
          <li className="text-primary-600"><Link to={'/author/course/' + courseName + '/lesson/' + lesson.get('Slug') + '/edit'}><i className="icon-pencil7"></i></Link></li>
          <li className="text-danger-600"><a href="#"><i className="icon-trash"></i></a></li>
        </ul>
      </td>
    </tr>
  );
};
export default LessonListItem;
