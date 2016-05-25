import React, { Component } from 'react';
import Helmet from 'react-helmet';


export default class Dashboard extends Component {
  static pageHeader = {
    title: ' - Dashboard',
    boldTitle: 'KNExpert'
  };

  render() {
    return (
      <div className="page-container">
        <Helmet title="Dashboard"/>
        <span>Dashboard here</span>
      </div>
    );
  }
}
