import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({questionLoaded})=> ({
  questions: questionLoaded
}))

export default function withQuestions(WrappedComponent) {
  class WithQuestions extends Component {
    static propTypes = {
      questions: PropTypes.object,
    }

    render() {
      const props = this.props;
      return (<WrappedComponent { ...props }/>);
    }
  }
  return hoistStatics(WithQuestions, WrappedComponent);
}
