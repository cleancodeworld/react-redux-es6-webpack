import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { findOne, isLoaded as isQuestionLoaded } from 'redux/modules/question/findOne';
import { find, isLoaded as isAnswersLoaded } from 'redux/modules/answer/find';

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isQuestionLoaded(state, params.questionId)) {
      promises.push(dispatch(findOne(params.questionShortId, params.questionName)));
    }
    if (!isAnswersLoaded(state, params.questionId)) {
      promises.push(dispatch(find(params.questionShortId, params.questionName)));
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
