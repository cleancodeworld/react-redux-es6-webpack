import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  SideProfile,
  SideMenu,
} from 'components';

@connect(
  ({auth}) => ({ user: auth.get('user') })
)
export default class PortalAuthorLayout extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    user: PropTypes.object,
  };

  render() {
    const {user} = this.props;
    return (
      <div className="page-content">
        <div className="sidebar sidebar-main sidebar-default">
          <div className="sidebar-content">
            <SideProfile name={user.get('firstName') + ' ' + user.get('lastName')} />
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
