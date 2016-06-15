import React, { Component, PropTypes } from 'react';
import { QuestionForm } from 'components';
import Helmet from 'react-helmet';


export default class QuestionAsk extends Component {
  static propTypes = {
    course: PropTypes.object,
    lesson: PropTypes.object,
    params: PropTypes.object.isRequired
  };

  static pageHeader = {
    title: ' - Ask',
    boldTitle: 'Question'
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Ask Question"/>
        <QuestionForm
          initialValues={{tags: []}}
          onSubmit={ (model) => alert(JSON.stringify(model, null, 4))}/>
      </div>
    );
  }
}
