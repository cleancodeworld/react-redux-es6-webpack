import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { replace } from 'react-router-redux';

@connect(({auth, portalCurrent})=> ({
  userId: auth.getIn(['user', 'userId']),
  ownerId: portalCurrent.getIn(['meta', 'ownerId'])
}), { replace })

export default class AuthorContainer extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    userId: PropTypes.string,
    location: PropTypes.object.isRequired,
    ownerId: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const { userId, ownerId } = this.props;
    if (userId !== ownerId) {
      let continueTo = this.props.location.pathname + this.props.location.search;
      continueTo = encodeURIComponent(continueTo);
      this.props.replace('/login?continueTo=' + continueTo);
    }
  }

  render() {
    return this.props.children;
  }
}
