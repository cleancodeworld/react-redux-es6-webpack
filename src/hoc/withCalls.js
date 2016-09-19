import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({callLoaded})=> ({
  calls: callLoaded.get('entities')
}))

export default function withCalls(WrappedComponent) {
  class WithCalls extends Component {
    static propTypes = {
      calls: PropTypes.object,
    }

    render() {
      const props = this.props;
      return (<WrappedComponent { ...props }/>);
    }
  }
  return hoistStatics(WithCalls, WrappedComponent);
}
