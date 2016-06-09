import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default function clientSideOnly(WrappedComponent) {
  class ClientSideOnly extends Component {
    state = {
      browser: false
    }

    componentDidMount() {
      this.setState({ browser: true }); // eslint-disable-line react/no-did-mount-set-state
    }

    render() {
      let res = (<div>Loading</div>);
      if (this.state.browser) {
        res = (<WrappedComponent { ...this.props }/>);
      }
      return res;
    }
  }
  return hoistStatics(ClientSideOnly, WrappedComponent);
}
