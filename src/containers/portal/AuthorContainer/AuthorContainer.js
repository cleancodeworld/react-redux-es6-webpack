import React, { PropTypes } from 'react';
import { withUserId, withPortal} from 'hoc';
import {
  ErrorPage
} from 'components';

@withUserId
@withPortal
export default class AuthorContainer extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    userId: PropTypes.string,
    location: PropTypes.object.isRequired,
    portal: PropTypes.object,
  }

  render() {
    const { userId, portal } = this.props;
    if (userId !== portal.meta.get('ownerId')) {
      return (<ErrorPage>You have not permission to access this page</ErrorPage>);
    }
    return this.props.children;
  }
}
