import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import config from '../../../config';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

@asyncConnect([{
  promise: ({store: {}}) => {
    const promises = [];
    return Promise.all(promises);
  }
}])
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const logoImage = require('./knexpert.png');
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
                  <NavItem eventKey={2}>Create account & Portal</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem eventKey={3}>Login</NavItem>
                </LinkContainer>
                <LinkContainer to="/create-portal">
                  <NavItem eventKey={4}>Create Portal</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div>
            {this.props.children}
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
