import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({courseLoaded}, ownProps)=> ({
  course: courseLoaded.getIn(['entities', ownProps.params.courseName])
}))

export default function withCourse(WrappedComponent) {
  class WithCourse extends Component {
    static propTypes = {
      course: PropTypes.object,
    }

    render() {
      const props = this.props;
      const {course} = props;
      return course ? (<WrappedComponent { ...props }/>) : <div>Course not found</div>;
    }
  }
  return hoistStatics(WithCourse, WrappedComponent);
}
