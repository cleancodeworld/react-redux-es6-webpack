import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

@connect(({auth, portalCurrent})=> ({
  userId: auth.getIn(['user', 'userId']),
  ownerId: portalCurrent.getIn(['meta', 'ownerId'])
}))

@withRouter
export default class AuthorContainer extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    userId: PropTypes.string,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    ownerId: PropTypes.string,
    replace: PropTypes.func
  }

  componentWillMount() {
    const { userId, ownerId, router } = this.props;
    if (userId !== ownerId) {
      let continueTo = this.props.location.pathname + this.props.location.search;
      continueTo = encodeURIComponent(continueTo);
      router.replace('/login?continueTo=' + continueTo);
    }
  }

  render() {
    return this.props.children;
  }
}
