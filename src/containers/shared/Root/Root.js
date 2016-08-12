import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import {withUser} from 'hoc';
import {Notifications, SignupModal, LoginModal} from 'components';
import { signup } from 'redux/modules/user/create';
import { hideSignUpModal, hideLogInModal } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import { userLogin } from 'redux/modules/auth';
import config from 'config';
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
  ({auth})=>({ isShowSignUpModal: auth.get('isShowSignUpModal'), isShowLogInModal: auth.get('isShowLogInModal') }),
  { signup, hideSignUpModal, hideLogInModal, push, userLogin }
)

@withUser

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    hideSignUpModal: PropTypes.func.isRequired,
    hideLogInModal: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    user: PropTypes.object,
    isShowSignUpModal: PropTypes.bool,
    isShowLogInModal: PropTypes.bool,
  };
  static childContextTypes = {
    user: PropTypes.object
  };

  state = {
    footerOpen: false
  };

  getChildContext() {
    const {user} = this.props;
    return {
      user
    };
  }

  toggleFooter = () => {
    this.state.footerOpen = !this.state.footerOpen;
    this.forceUpdate();
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
      <LoginModal
        onSubmit={(modal)=> this.props.userLogin(modal).then(()=>this.props.hideLogInModal())}
        onHide={()=> this.props.hideLogInModal()}
        show={this.props.isShowLogInModal}
      />
      {this.props.children}
      <div className="navbar navbar-default navbar-fixed-bottom footer">
        <ul className="nav navbar-nav visible-xs-block">
          <li><a className="text-center collapsed legitRipple" data-toggle="collapse" data-target="#footer"
                 onClick={this.toggleFooter}>
            { this.state.footerOpen ?
              (<i className="icon-circle-down2"></i>)
              :
              (<i className="icon-circle-up2"></i>)
            }
          </a></li>
        </ul>
        <div className={'navbar-collapse collapse' + (this.state.footerOpen ? ' in' : '')} id="footer">
          <div className="navbar-text">
            © 2016. <a href="#" className="navbar-link">Knexpert</a> by <a href="http://knexpert.com"
                                                                           className="navbar-link"
                                                                           target="_blank">CURTIS Digital, Inc.</a>
          </div>
          <div className="navbar-right">
            <ul className="nav navbar-nav">
              <li><a href={'//' + config.mainDomain + '/page/About-Us/zKfdYx'} className="legitRipple">About</a></li>
              <li><a href={'//' + config.mainDomain + '/page/Terms/T9ltKI'} className="legitRipple">Terms</a></li>
              <li><a href={'//' + config.mainDomain + '/page/Contact/JwLbzB'} className="legitRipple">Contact</a></li>
              <li><a target="_blank" href={ `${repoUrl}/tree/${lastCommit}` }
                     className="legitRipple">{buildVersion}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>);
  }
}
