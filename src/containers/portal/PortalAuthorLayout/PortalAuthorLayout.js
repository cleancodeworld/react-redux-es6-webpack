import React, { Component, PropTypes } from 'react';
import {
  SideProfile,
  SideMenu,
} from 'components';

export default class PortalAuthorLayout extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    return (
      <div className="page-content">
        <div className="sidebar sidebar-main sidebar-default">
          <div className="sidebar-content">
            <SideProfile />
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
