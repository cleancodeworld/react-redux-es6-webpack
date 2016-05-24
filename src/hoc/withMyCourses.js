import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(
  ({myCourses}) => ({
    myCoursesEntities: myCourses.get('entities'),
    myCoursesOrder: myCourses.get('order'),
  })
)
export default function withMyCourses(WrappedComponent) {
  class WithMyCourses extends Component {
    static propTypes = {
      myCoursesEntities: PropTypes.object,
      myCoursesOrder: PropTypes.object,
    }

    render() {
      const {myCoursesOrder, myCoursesEntities, ...otherProps} = this.props;
      return (<WrappedComponent { ...otherProps }
        myCourses={{entities: myCoursesEntities, order: myCoursesOrder}}/>);
    }
  }
  return hoistStatics(WithMyCourses, WrappedComponent);
}
