import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({questionLoaded}, ownProps)=> ({
  question: questionLoaded.get(ownProps.params.questionShortId)
}))

export default function withQuestion(WrappedComponent) {
  class WithQuestion extends Component {
    static propTypes = {
      question: PropTypes.object,
    }

    render() {
      const props = this.props;
      const {question} = props;
      return question ? (<WrappedComponent { ...props }/>) : <div>Question not found</div>;
    }
  }
  return hoistStatics(WithQuestion, WrappedComponent);
}
