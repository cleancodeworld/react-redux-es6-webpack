import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({courseLoaded}, ownProps)=> ({
  page: courseLoaded.getIn(['entities', ownProps.params.courseName, 'lessons', 'entities', ownProps.params.lessonName, 'pages', 'entities', ownProps.params.pageName]),
}))

export default function withPage(WrappedComponent) {
  class WithPage extends Component {
    static propTypes = {
      page: PropTypes.object,
    }

    render() {
      const {page} = this.props;
      return page ? (<WrappedComponent { ...this.props }/>) : <div>Page not found</div>;
    }
  }
  return hoistStatics(WithPage, WrappedComponent);
}
