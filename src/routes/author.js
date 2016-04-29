import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    NotFound,
    LoginSuccess, // temporary
  } from '../containers';
import {
    Portal
  } from '../containers/Author';

export default (funcs) => {
  // const {requireLogin, subdomain} = funcs;
  const {requireLogin} = funcs;

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Sample component for dynamic subdomain routing */ }
      <Route path="portal/:portalname" component={Portal} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
