import React, {PropTypes} from 'react';
import {
  Expert, Guest, Requester
} from './types/index';

const CallListItem = (props, context) => {
  const {call} = props;
  if (context.user && call.get('authorId') === context.user.get('userId')) {
    return <Expert {...props}/>;
  } else if (context.user && context.user.get('userId')) {
    return <Requester {...props}/>;
  }
  return <Guest {...props}/>;
};

CallListItem.contextTypes = {
  user: PropTypes.object,
};

CallListItem.propTypes = {
  call: PropTypes.object.isRequired,
};

export default CallListItem;
