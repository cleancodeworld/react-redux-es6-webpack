import React, { Component, PropTypes } from 'react';

import {connect} from 'react-redux';
import {updateCoverImage} from 'redux/modules/portal/edit';
import {withPortal, withUser, withCourse} from 'hoc';
import {error} from 'redux/modules/notifications';

import {
  ProfileCover,
  ProfileToolbar,
  CourseRightMenu,
  ErrorPage
} from 'components';

@connect(null, { updateCoverImage, error })

@withPortal
@withUser
@withCourse
export default class PortalAuthorCourseLayout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    params: PropTypes.object,
    portal: PropTypes.object,
    course: PropTypes.object,
    user: PropTypes.object,
    updateCoverImage: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
  };

  render() {
    const { portal, user, course } = this.props;
    if (course.get('authorId') !== user.get('userId')) {
      return (<ErrorPage>Oops, Only owner can edit course</ErrorPage>);
    }
    return (
      <div>
        <ProfileCover error={this.props.error}
                      portal={portal.meta} user={user}
                      updateCoverImage={this.props.updateCoverImage}/>
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
            <CourseRightMenu course={course}/>
          </div>
        </div>
      </div>
    );
  }
}
