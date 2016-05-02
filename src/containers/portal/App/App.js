import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import config from '../../../config';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {connect} from 'react-redux';
import { isChecked, check as portalCheck } from 'redux/modules/portal';
import {
  NotFound
} from '../../bare';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isChecked(getState())) {
      promises.push(dispatch(portalCheck('abc')));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ stt: state })
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    stt: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const logoImage = require('./knexpert.png');
    const subdomain = this.props.route.subdomain;
    let content = this.props.children;
    console.log(this.props.stt);
    if (subdomain === 'abc123') {
      content = <NotFound />;
    }
    return (
      <div>
        <div className="navbar-bottom login-container">
          <Helmet {...config.app.head}/>
          <Navbar className="bg-blue" fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                  <img src={logoImage} alt="KNExpert"/>
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse eventKey={0}>
              <Nav navbar>
                <LinkContainer to="/account-portal-create">
                  <NavItem eventKey={2}>Menu Item</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div>
            {content}
          </div>
        </div>
        <div className="navbar navbar-default navbar-fixed-bottom footer">
          <ul className="nav navbar-nav visible-xs-block">
            <li><a className="text-center collapsed legitRipple" data-toggle="collapse" data-target="#footer"><i
              className="icon-circle-up2"></i></a></li>
          </ul>
          <div className="navbar-collapse collapse" id="footer">
            <div className="navbar-text">
              © 2016. <a href="#" className="navbar-link">Knexpert</a> by <a href="http://knexpert.com" className="navbar-link"
                                                                         target="_blank">CURTIS Digital, Inc.</a>
            </div>
            <div className="navbar-right">
              <ul className="nav navbar-nav">
                <li><a href="#" className="legitRipple">About</a></li>
                <li><a href="#" className="legitRipple">Terms</a></li>
                <li><a href="#" className="legitRipple">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
