import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  SideProfile,
  SideMenu,
} from 'components';
import { logout } from 'redux/modules/auth';

@connect(
  ({auth}) => ({ user: auth.get('user') }),
  { logout },
)
export default class PortalAuthorLayout extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func,
  };

  render() {
    const {user} = this.props;
    return (
      <div className="page-content">
        <div className="sidebar sidebar-main sidebar-default">
          <div className="sidebar-content">
            <SideProfile name={user.get('firstName') + ' ' + user.get('lastName')} logout={this.props.logout}/>
            <SideMenu />
          </div>
        </div>
        <div className="content-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}
