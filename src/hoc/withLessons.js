import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({courseLoaded}, ownProps)=> ({
  lessonsEntities: courseLoaded.getIn(['entities', ownProps.params.courseName, 'lessons', 'entities']),
  lessonsOrder: courseLoaded.getIn(['entities', ownProps.params.courseName, 'lessons', 'order']),
}))

export default function withLessons(WrappedComponent) {
  class WithLessons extends Component {
    static propTypes = {
      lessonsEntities: PropTypes.object,
      lessonsOrder: PropTypes.object,
    }

    render() {
      const {lessonsEntities, lessonsOrder, ...otherProps} = this.props;
      return (<WrappedComponent lessons={{order: lessonsOrder, entities: lessonsEntities}} { ...otherProps }/>);
    }
  }
  return hoistStatics(WithLessons, WrappedComponent);
}
