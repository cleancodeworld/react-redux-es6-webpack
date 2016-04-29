import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    NotFound,
  } from '../containers';
import {
    Portal
  } from '../containers/Author';

export default (funcs) => {
  // const {requireLogin, subdomain} = funcs;

  // for testing
  // console.log(subdomain);
  // to avoid lint error - only temporary until more codes are written here
  if (funcs) {}

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route path="portal/:portalname" component={Portal}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
