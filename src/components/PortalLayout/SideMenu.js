import React, {Component} from 'react';

export default class ProfileToolbar extends Component {
  render() {
    return (
      <div className="category-content no-padding">
        <ul className="navigation navigation-main navigation-accordion">
          <li className="navigation-header"><span>Main</span> <i className="icon-menu" title="Main pages"></i></li>
          <li><a href="index.html"><i className="icon-home4"></i> <span>Dashboard</span></a></li>
          <li><a href="index.html"><i className="icon-home4"></i> <span>Course Mgr</span></a></li>
        </ul>
      </div>
    );
  }
}
