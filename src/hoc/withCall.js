import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({callLoaded}, ownProps)=> ({
  call: callLoaded.getIn(['entities', ownProps.params.callName])
}))

export default function withCall(WrappedComponent) {
  class WithCall extends Component {
    static propTypes = {
      call: PropTypes.object,
    }

    render() {
      const props = this.props;
      const {call} = props;
      return call ? (<WrappedComponent { ...props }/>) : <div>Call not found</div>;
    }
  }
  return hoistStatics(WithCall, WrappedComponent);
}
