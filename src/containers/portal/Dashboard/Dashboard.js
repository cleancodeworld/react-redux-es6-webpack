import React, { Component } from 'react';
import {
  PortalLayout,
  PortalAuthorLayout,
} from '../index';

export default class Dashboard extends Component {

  render() {
    const breadcrumbs = [
      { url: '/author', name: 'Author' }
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Author Dashboard">
          <PortalAuthorLayout>
            <span>Dashboard here</span>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
