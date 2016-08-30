import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {connect} from 'react-redux';
import Breadcrumbs from 'react-breadcrumbs';
import last from 'lodash/last';
import {
  UserNav,
  PageHeader,
  PageHeaderContent,
} from 'components';
import {logout} from 'redux/modules/auth';
import {withPortal, withUser} from 'hoc';
@connect(
  null,
  { logout }
)
@withPortal
@withUser
export default class PortalLayout extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    portal: PropTypes.object.isRequired,
    user: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.array,
    logout: PropTypes.func,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  render() {
    const logoImage = require('./knexpert.png');
    const {user} = this.props;
    const lastRoute = last(this.props.routes);
    return (
      <div className="navbar-bottom portal-container">
        <Navbar className="bg-blue" fluid inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <img src={logoImage} alt="KNExpert"/>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav navbar>
              <LinkContainer to="/courses">
                <NavItem eventKey={2}>Courses</NavItem>
              </LinkContainer>
              <LinkContainer to="/question">
                <NavItem eventKey={2}>Questions</NavItem>
              </LinkContainer>
              <LinkContainer to="/request-call">
                <NavItem eventKey={2}>Clarify</NavItem>
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
              {user ? <LinkContainer to="/author">
                <NavItem eventKey={6}>Author Admin Panel</NavItem>
              </LinkContainer> : null}
            </Nav>
            <UserNav portal logout={this.props.logout} user={user} loggedIn={!!user}/>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <PageHeader>
            <div className="breadcrumb-line">
              <Breadcrumbs
                customClass="breadcrumb"
                wrapperElement="ul" itemElement="li"
                routes={this.props.routes}
                params={this.props.params}
                separator=""
                activeItemClass="active"
              />
            </div>
            <PageHeaderContent pageHeader={lastRoute.component.pageHeader}/>
          </PageHeader>
          {this.props.children}
        </div>
      </div>
    );
  }
}
