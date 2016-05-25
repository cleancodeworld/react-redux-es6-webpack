import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Breadcrumb extends Component {

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
  };

  render() {
    const {breadcrumbs} = this.props;
    console.log(breadcrumbs);
    return (
      <ul className="breadcrumb">
        <li><Link to="/"><i className="icon-home2 position-left"></i> Home</Link></li>
        {breadcrumbs.map((breadcrumb, index) => {
          return breadcrumb ? (
            <li key={index}><Link to={breadcrumb.path}>{breadcrumb.title}</Link></li>
          ) : null;
        })}
      </ul>
    );
  }
}
