import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { findOne, isLoaded } from 'redux/modules/question/findOne';

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isLoaded(state, params.questionId)) {
      promises.push(dispatch(findOne(params.questionShortId, params.questionName)));
    }
    return Promise.all(promises);
  }
}])

export default class Question extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return this.props.children;
  }
}
