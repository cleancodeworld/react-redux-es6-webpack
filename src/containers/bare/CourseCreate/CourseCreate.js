import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { connect } from 'react-redux';
import { createWithPortal as userCreateWithPortal } from 'redux/modules/user/create';

@connect(null, { userCreateWithPortal })
export default class AccountPortalCreate extends Component {

  static propTypes = {
    userCreateWithPortal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <CourseForm onSubmit={ model => this.props.userCreateWithPortal(model)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
