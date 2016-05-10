import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { PortalLayout } from '../../portal/index';

export default class Home extends Component {

  render() {
    const breadcrumbs = [];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Home">
          <Helmet title="Home"/>
          <span>Portal home page</span>
        </PortalLayout>
      </div>
    );
  }
}
