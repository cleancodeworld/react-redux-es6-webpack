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
  UserNav,
  PageHeader,
  Breadcrumb,
  PageHeaderContent,
  SideProfile,
  SideMenu,
} from 'components';

import {logout} from 'redux/modules/auth';
import {
  NotFound
} from '../../bare';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isChecked(state)) {
      if (state.portal && state.portal.get('reqSubdomain')) {
        promises.push(dispatch(portalCheck(state.portal.get('reqSubdomain'))));
      }
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ portal: state.portal }),
  { logout }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    portal: PropTypes.object.isRequired,
    logout: PropTypes.func,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  render() {
    const logoImage = require('./knexpert.png');
    const {portal} = this.props;
    const {user} = this.context;
    let content = this.props.children;
    if (!portal || !portal.get('data')) {
      content = <NotFound />;
    }
    return (
      <div>
        <div className="navbar-bottom portal-container">
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
                <LinkContainer to="/course/create">
                  <NavItem eventKey={2}>Create course</NavItem>
                </LinkContainer>
                <LinkContainer to="/course/list">
                  <NavItem eventKey={3}>List course</NavItem>
                </LinkContainer>
              </Nav>
              <UserNav logout={this.props.logout} user={user} loggedIn={!!user}/>
            </Navbar.Collapse>
          </Navbar>
          <PageHeader>
            <Breadcrumb />
            <PageHeaderContent />
          </PageHeader>
          <div className="page-container">
            <div className="page-content">
              <div className="sidebar sidebar-main sidebar-default">
                <div className="sidebar-content">
                  <SideProfile />
                  <SideMenu />
                </div>
              </div>
              <div className="content-wrapper">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
