import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])
@connect(({auth})=>({ user: auth.get('user') }))
export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object
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
    const buildVersion = __BUILD_VERSION__; // eslint-disable-line no-undef
    const lastCommit = __LAST_COMMIT__; // eslint-disable-line no-undef
    const repoUrl = require('../../../package.json').homepage;
    return (<div>
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
              <li><a href={ `${repoUrl}/tree/${lastCommit}` }
                     className="legitRipple">{buildVersion}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>);
  }
}
