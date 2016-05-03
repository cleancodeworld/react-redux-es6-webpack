import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Portal,
  VerifyRegistration,
} from '../containers/portal';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Sample component for dynamic subdomain routing */ }
      <Route path="portal/:portalname" component={Portal}/>
      <Route path="verify/registration" component={VerifyRegistration}/>
      { /* Home (main) route */ }
      <IndexRoute component={Portal}/>
    </Route>
  );
};
