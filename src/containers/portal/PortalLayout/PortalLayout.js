import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {connect} from 'react-redux';
import {
  UserNav,
  PageHeader,
  PageHeaderContent,
  BreadcrumbBar,
} from 'components';
import {logout} from 'redux/modules/auth';
import {
  NotFound
} from '../../shared';

@connect(
  ({portalCurrent}) => ({ portalCurrentMeta: portalCurrent.get('meta') }),
  { logout }
)
export default class PortalLayout extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    portalCurrentMeta: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func,
    breadcrumbs: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    boldTitle: PropTypes.string,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  render() {
    const logoImage = require('./knexpert.png');
    const {portalCurrentMeta, breadcrumbs, title, boldTitle} = this.props;
    const {user} = this.context;
    let content = this.props.children;
    if (!portalCurrentMeta) {
      content = <NotFound />;
    }
    return (
      <div className="navbar-bottom portal-container">
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
              <LinkContainer to="/courses">
                <NavItem eventKey={2}>Courses</NavItem>
              </LinkContainer>
              {user ?
                <LinkContainer to="/wish-list">
                  <NavItem eventKey={3}>My wishlist</NavItem>
                </LinkContainer> : null}
              {user ?
                <LinkContainer to="/cart">
                  <NavItem eventKey={4}>Cart</NavItem>
                </LinkContainer> : null}
              {user ?
                <LinkContainer to="/my-courses">
                  <NavItem eventKey={5}>My Courses</NavItem>
                </LinkContainer> : null}
              <LinkContainer to="/author">
                <NavItem eventKey={6}>Author Admin Panel</NavItem>
              </LinkContainer>
            </Nav>
            <UserNav logout={this.props.logout} user={user} loggedIn={!!user}/>
          </Navbar.Collapse>
        </Navbar>
        <PageHeader>
          <BreadcrumbBar breadcrumbs={breadcrumbs}/>
          <PageHeaderContent boldTitle={boldTitle} title={title}/>
        </PageHeader>
        <div className="page-container">
          {content}
        </div>
      </div>
    );
  }
}
