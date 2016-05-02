import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {AccountPortalForm} from 'components';
import { connect } from 'react-redux';
import { create as userCreate } from 'redux/modules/user';

@connect(null, { userCreate })
export default class AccountPortalCreate extends Component {

  static propTypes = {
    userCreate: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <AccountPortalForm onSubmit={ model => this.props.userCreate(model)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
