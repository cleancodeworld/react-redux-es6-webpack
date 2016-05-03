import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])

@connect(({auth})=>({ user: auth.get('user') }))
export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object
  };
  static childContextTypes = {
    user: PropTypes.object
  };

  getChildContext() {
    debugger;
    const {user} = this.props;
    return {
      user
    };
  }

  render() {
    return this.props.children;
  }
}
