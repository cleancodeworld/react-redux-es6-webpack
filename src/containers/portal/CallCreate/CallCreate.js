import React, { Component, PropTypes } from 'react';
import { CallForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {withUserId, withPortal} from 'hoc';
import {create} from 'redux/modules/question/create';
import { push } from 'react-router-redux';

@connect(null, { create, push })
@withUserId
@withPortal

export default class CallCreate extends Component {
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
      <div className="page-container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="content-wrapper">
              <div className="container">
                <Helmet title="Request Call"/>
                <CallForm
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
            </div>
          </div>
        </div>
      </div>

    );
  }
}
