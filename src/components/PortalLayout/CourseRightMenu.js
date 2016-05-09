import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class CourseRightMenu extends Component {
  static propTypes = {
    courseName: PropTypes.string,
  }
  render() {
    const {courseName} = this.props;
    return (
      <div className="panel panel-flat">
        <div className="panel-heading">
          <h6 className="panel-title">Navigation</h6>
        </div>
        <div className="list-group no-border no-padding-top">
          <a href="#" className="list-group-item"><i className="icon-user"></i> Goals</a>
          <a href="#" className="list-group-item"><i className="icon-cash3"></i> Accounting</a>
          <Link to={'/course/' + courseName + '/lesson/list'} className="list-group-item"><i className="icon-tree7"></i> Curriculum <span className="badge bg-danger pull-right">2</span></Link>
          <a href="#" className="list-group-item"><i className="icon-users"></i> SEO</a>
          <div className="list-group-divider"></div>
          <a href="#" className="list-group-item"><i className="icon-calendar3"></i> Co-Authors<span className="badge bg-teal-400 pull-right">48</span></a>
          <a href="#" className="list-group-item"><i className="icon-cog3"></i> Metrics</a>
        </div>
      </div>
    );
  }
}