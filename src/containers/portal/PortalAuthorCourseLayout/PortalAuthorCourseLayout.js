import React, { Component, PropTypes } from 'react';
import {
  ProfileCover,
  ProfileToolbar,
  CourseRightMenu
} from 'components';

export default class PortalAuthorCourseLayout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    params: PropTypes.object,
  };

  render() {
    const {courseName} = this.props.params;
    return (
      <div>
        <ProfileCover />
        <ProfileToolbar />
        <div className="row">
          <div className="col-lg-9">
            <div className="tabbable">
              <div className="tab-content">
                <div className="tab-pane fade in active">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <CourseRightMenu courseName={courseName} />
          </div>
        </div>
      </div>
    );
  }
}
