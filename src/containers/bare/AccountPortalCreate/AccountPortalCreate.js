import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {AccountPortalForm} from 'components';

export default class AccountPortalCreate extends Component {

  handleSubmit = () => {
  }

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <AccountPortalForm onSubmit={this.handleSubmit}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
