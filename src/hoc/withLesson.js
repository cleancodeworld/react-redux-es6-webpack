import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({courseLoaded}, ownProps)=> ({
  lesson: courseLoaded.getIn(['entities', ownProps.params.courseName, 'lessons', 'entities', ownProps.params.lessonName]),
}))

export default function withLesson(WrappedComponent) {
  class WithLesson extends Component {
    static propTypes = {
      lesson: PropTypes.object,
    }

    render() {
      const props = this.props;
      const {lesson} = props;
      return lesson ? (<WrappedComponent { ...props }/>) : <div>Lesson not found</div>;
    }
  }
  return hoistStatics(WithLesson, WrappedComponent);
}
