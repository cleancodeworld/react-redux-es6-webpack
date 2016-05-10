import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Breadcrumb extends Component {

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
  };

  render() {
    const {breadcrumbs} = this.props;
    return (
      <ul className="breadcrumb">
        <li><a href="index.html"><i className="icon-home2 position-left"></i> Home</a></li>
        {breadcrumbs.map((path, index) => {
          return (
            <li key={index}><Link to={path.url}>{path.name}</Link></li>
          );
        })}
      </ul>
    );
  }
}
