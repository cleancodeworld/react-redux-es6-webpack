import React from 'react';

const LessonDetailsRow = ({lesson})=> {
  return (<tr className="cur-list-row-detail">
    <td className="hm"></td>
    <td colSpan="3"><p>{lesson.get('description')}</p></td>
  </tr>);
};
export default LessonDetailsRow;
