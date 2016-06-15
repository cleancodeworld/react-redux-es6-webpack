import React from 'react';

const LessonRow = ({index, lesson, isMyCoursesItem, user, lessonPreviewButton, showSignUpModal, showCheckOutModal})=> {
  return (<tr className="cur-list-row  ">
    <td className="lec-icon tac hm cur-icon wa-force-xs">
      <i className="fa fa-play-circle"></i>
    </td>

    <td className="count wa-force-xs">
      <strong>Lesson {index}:</strong> {lesson.get('title')}
    </td>

    <td className="lec-title-and-preview">
      {user && isMyCoursesItem
        ? React.cloneElement(lessonPreviewButton, { lesson: lesson })
        : <div className="lec-title-and-preview-inner dif aic fxjsa-xs pr10-xs fxac-ie">
        <a href="javascript:void(0)"
           onClick={()=> !user ? showSignUpModal() : showCheckOutModal()}
           className="btn btn-sm ud-popup ud-courseimpressiontracker preview-btn ml15 btn-primary legitRipple">
          Preview
        </a>
      </div>
      }
    </td>
    <td className="text-right lec-det">
      <img src={lesson.get('thumbnail')} style={{maxHeight: 40}} alt=""/>
    </td>
  </tr>);
};

export default LessonRow;
