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
    return (
      <div className="page-container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="content-wrapper">
              <div className="container">
                <Helmet title="Request Call"/>
                <CallForm
                  onSubmit={ model => alert(JSON.stringify(model, null, 4))}/>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
