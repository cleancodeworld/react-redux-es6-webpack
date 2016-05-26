import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import {withUser} from 'hoc';
import {Notifications, SignupModal} from 'components';
import { signup } from 'redux/modules/user/create';
import { hideSignUpModal } from 'redux/modules/auth';
import { push } from 'react-router-redux';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])

@connect(
  ({auth})=>({ isShowSignUpModal: auth.get('isShowSignUpModal') }),
  { signup, hideSignUpModal, push }
)

@withUser

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    hideSignUpModal: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    user: PropTypes.object,
    isShowSignUpModal: PropTypes.bool,

  };
  static childContextTypes = {
    user: PropTypes.object
  };

  getChildContext() {
    const {user} = this.props;
    return {
      user
    };
  }

  render() {
    const buildVersion = String(__BUILD_VERSION__).replace(/['"]+/g, ''); // eslint-disable-line no-undef
    const lastCommit = String(__LAST_COMMIT__).replace(/['"]+/g, ''); // eslint-disable-line no-undef
    const repoUrl = require('../../../../package.json').homepage;
    return (<div>
      <Notifications/>
      <SignupModal
        onSubmit={(modal)=> this.props.signup(modal).then(()=>this.props.hideSignUpModal()).then(()=> this.props.push('/login'))}
        onHide={()=> this.props.hideSignUpModal()}
        show={this.props.isShowSignUpModal}
      />
      {this.props.children}
      <div className="navbar navbar-default navbar-fixed-bottom footer">
        <ul className="nav navbar-nav visible-xs-block">
          <li><a className="text-center collapsed legitRipple" data-toggle="collapse" data-target="#footer"><i
            className="icon-circle-up2"></i></a></li>
        </ul>
        <div className="navbar-collapse collapse" id="footer">
          <div className="navbar-text">
            © 2016. <a href="#" className="navbar-link">Knexpert</a> by <a href="http://knexpert.com"
                                                                           className="navbar-link"
                                                                           target="_blank">CURTIS Digital, Inc.</a>
          </div>
          <div className="navbar-right">
            <ul className="nav navbar-nav">
              <li><a href="#" className="legitRipple">About</a></li>
              <li><a href="#" className="legitRipple">Terms</a></li>
              <li><a href="#" className="legitRipple">Contact</a></li>
              <li><a target="_blank" href={ `${repoUrl}/tree/${lastCommit}` }
                     className="legitRipple">{buildVersion}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>);
  }
}
