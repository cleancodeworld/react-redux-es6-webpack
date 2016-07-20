import React, { Component, PropTypes } from 'react';
import { QuestionForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {withUserId, withPortal} from 'hoc';
import {create} from 'redux/modules/question/create';
import { push } from 'react-router-redux';

@connect(null, { create, push })
@withUserId
@withPortal

export default class QuestionAsk extends Component {
  static propTypes = {
    userId: PropTypes.string,
    portal: PropTypes.object,
    create: PropTypes.func,
    push: PropTypes.func,
  };

  static pageHeader = {}

  render() {
    const {userId, portal} = this.props;

    return (
      <div className="container">
        <Helmet title="Ask Question"/>
        <QuestionForm
          initialValues={{tags: []}}
          onSubmit={ model => this.props.create({
            ...model,
            title: model.title.trim(),
            authorId: userId,
            portalId: portal.meta.get('id'),
            tags: model.tags.map(item => item.name).join(',')
          }).then((res)=> this.props.push(`/question/${res.data.question.shortId}/${res.data.question.slug}`))
          }/>
      </div>
    );
  }
}
