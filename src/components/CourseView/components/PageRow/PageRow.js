import React from 'react';

const PageRow = ({index, page, isMyCoursesItem, user, showSignUpModal, pagePreviewButton, showCheckOutModal})=> {
  return (<tr className="cur-list-row  ">
    <td className="lec-icon tac hm cur-icon wa-force-xs">
      <i className="fa fa-play-circle"></i>
    </td>

    <td className="count wa-force-xs">
      <strong>Page {index}:</strong> {page.get('title')}
    </td>

    <td className="lec-title-and-preview">
      {user && isMyCoursesItem
        ? React.cloneElement(pagePreviewButton, { page: page })
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
    </td>
  </tr>);
};
export default PageRow;
