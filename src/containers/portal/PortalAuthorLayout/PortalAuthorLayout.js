import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  SideProfile,
  SideMenu,
} from 'components';
import { logout } from 'redux/modules/auth';
import {updateImage} from 'redux/modules/user/edit';
import {error} from 'redux/modules/notifications';
import { withUser } from 'hoc';

@connect(
  null,
  { logout, updateImage, error }
)
@withUser
export default class PortalAuthorLayout extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func,
    updateImage: PropTypes.func,
    error: PropTypes.func,
  };

  render() {
    const {user} = this.props;
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="sidebar sidebar-main sidebar-default">
            <div className="sidebar-content">
              <SideProfile error={this.props.error} logout={this.props.logout} updateImage={this.props.updateImage} user={user}/>
              <SideMenu />
            </div>
          </div>
          <div className="content-wrapper">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
