import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { CreatePortalForm } from 'components';
import { connect } from 'react-redux';
import { createPortal } from 'redux/modules/portal';

@connect(null, { createPortal })
export default class CreatePortal extends Component {

  static propTypes = {
    createPortal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <CreatePortalForm onSubmit={ model => this.props.createPortal(model) }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
