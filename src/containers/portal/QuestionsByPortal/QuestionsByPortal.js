import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  QuestionsList,
} from 'components';
import { load, isLoaded } from 'redux/modules/question/byPortal';
import {withQuestions} from 'hoc';
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isLoaded(state)) {
      promises.push(dispatch(load(state.portalCurrent.get('reqSubdomain'))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({questionsByPortal}) => ({
    order: questionsByPortal.get('order'),
  })
)

@withQuestions

export default class QuestionsByPortal extends Component {

  static propTypes = {
    order: PropTypes.object,
    questions: PropTypes.object,
  };

  static pageHeader = {};

  render() {
    const {questions, order} = this.props;
    return (
      <div className="container">
        <Helmet title="Questions"/>
        <div className="row">
          <div className="col-md-12">
            <QuestionsList entities={questions}
                           order={order}/>
          </div>
        </div>
      </div>
    );
  }
}
