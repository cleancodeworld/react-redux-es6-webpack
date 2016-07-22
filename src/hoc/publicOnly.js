import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

@connect(
  ({auth}) => ({
    userId: auth.getIn(['user', 'userId']),
  }), { push }
)
export default function publicOnly(WrappedComponent) {
  class WithUserId extends Component {
    static propTypes = {
      userId: PropTypes.string,
      push: PropTypes.func,
    }

    componentDidMount() {
      const { userId} = this.props;
      if (userId) {
        this.props.push('/');
      }
    }

    render() {
      const props = this.props;
      const { userId} = this.props;
      if (userId) {
        return (<span/>);
      }
      return (<WrappedComponent { ...props }/>);
    }
  }
  return hoistStatics(WithUserId, WrappedComponent);
}
