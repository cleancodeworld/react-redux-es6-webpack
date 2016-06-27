import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({portalLoaded})=> ({
  portals: portalLoaded
}))

export default function withCourses(WrappedComponent) {
  class WithCourses extends Component {
    static propTypes = {
      portals: PropTypes.object,
    }

    render() {
      const props = this.props;
      return (<WrappedComponent { ...props }/>);
    }
  }
  return hoistStatics(WithCourses, WrappedComponent);
}
