import React, {PropTypes} from 'react';
import {
  Expert, Guest, Requester
} from './types/index';

const CallListItem = (props) => {
  const {portal, user} = props;
  if (user && portal && user.get('userId') === portal.getIn(['owner', 'id'])) {
    return <Expert {...props}/>;
  } else if (user && user.get('userId')) {
    return <Requester {...props}/>;
  }
  return <Guest {...props}/>;
};

CallListItem.propTypes = {
  call: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  portal: PropTypes.object.isRequired,
};

export default CallListItem;
