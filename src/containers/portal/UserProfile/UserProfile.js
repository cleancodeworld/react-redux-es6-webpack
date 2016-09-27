import React, { Component, PropTypes } from 'react';
import { UserProfileForm } from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {withUser} from 'hoc';
import { updatePhone } from 'redux/modules/user/edit';

@connect(null, { updatePhone })
@withUser

export default class UserProfile extends Component {
  static propTypes = {
    user: PropTypes.object,
    updatePhone: PropTypes.func,
  };

  static pageHeader = {}

  render() {
    const {user} = this.props;
    return (
      <div className="page-container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="content-wrapper">
              <div className="container">
                <Helmet title="User Profile"/>
                <UserProfileForm
                  initialValues={{phone: user.get('phone')}}
                  onSubmit={ model => this.props.updatePhone(user.toJS(), model.phone)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
