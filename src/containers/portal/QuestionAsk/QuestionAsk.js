import React, { Component, PropTypes } from 'react';
import { QuestionForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {withUserId, withPortal, clientSideOnly} from 'hoc';
import {create} from 'redux/modules/question/create';

@clientSideOnly
@connect(null, { create })
@withUserId
@withPortal

export default class QuestionAsk extends Component {
  static propTypes = {
    userId: PropTypes.string,
    portal: PropTypes.object,
    create: PropTypes.func,
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
            authorId: userId,
            portalId: portal.meta.get('id'),
            tags: model.tags.map(item => item.name).join(',')
          })
          }/>
      </div>
    );
  }
}
