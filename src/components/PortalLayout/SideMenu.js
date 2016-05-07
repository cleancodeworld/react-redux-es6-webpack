import React, {Component} from 'react';
import {Link} from 'react-router';

export default class ProfileToolbar extends Component {
  render() {
    return (
      <div className="category-content no-padding">
        <ul className="navigation navigation-main navigation-accordion">
          <li className="navigation-header"><span>Main</span> <i className="icon-menu" title="Main pages"></i></li>
          <li><Link to="/"><i className="icon-home4"></i> <span>Dashboard</span></Link></li>
          <li><Link to="/course/list"><i className="icon-home4"></i> <span>Course Mgr</span></Link></li>
        </ul>
      </div>
    );
  }
}
