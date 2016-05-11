import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

@connect(({auth, portalCurrent})=> ({
  userId: auth.getIn(['user', 'userId']),
  ownerId: portalCurrent.getIn(['meta', 'ownerId'])
}))
export default class AuthorContainer extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
  }

  render() {
    const { userId, ownerId } = this.props;
    let res;
    if (userId === ownerId) {
      res = this.props.children;
    } else {
      res = (<div className="container">
        <h2>You don't have permission <Link to="/login">Login here</Link></h2></div>);
    }
    return (
      <div>
        {res}
      </div>
    );
  }
}
