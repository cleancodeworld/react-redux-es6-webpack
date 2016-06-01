import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {PageBuilder} from 'components';

export default class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <Helmet title="Home"/>
          <PageBuilder/>
        </div>
      </div>
    );
  }
}
