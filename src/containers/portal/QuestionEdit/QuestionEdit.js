import React, { Component, PropTypes } from 'react';
import { QuestionForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {withUserId, withPortal, withQuestion} from 'hoc';
import {edit} from 'redux/modules/question/edit';

@connect(null, { edit })
@withUserId
@withPortal
@withQuestion

export default class QuestionEdit extends Component {
  static propTypes = {
    userId: PropTypes.string,
    portal: PropTypes.object,
    edit: PropTypes.func,
    question: PropTypes.object,
  };

  static pageHeader = {}

  render() {
    const {userId, portal, question} = this.props;
    const values = question.toJS();
    return (
      <div className="container">
        <Helmet title="Ask Question"/>
        <QuestionForm
          initialValues={{...values, tags: values.tags && values.tags.split(',').map(item=>({name: item, id: item})) || []}}
          onSubmit={ model => this.props.edit({
            ...model,
            authorId: userId,
            portalId: portal.meta.get('id'),
            tags: model.tags.map(item => item.name).join(',')
          })
          }/>
      </div>
    );
  }
}
