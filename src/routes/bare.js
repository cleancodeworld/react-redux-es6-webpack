import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Home,
  NotFound,
  AccountPortalCreate,
  Login,
  VerifyRegistration,
  CreatePortal,
} from '../containers/bare';

import Root from '../containers/Root/Root';

export default () => {
  // const { requireLogin } = params;
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route component={Root}>
      <Route path="/" component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={Home}/>

        { /* Routes */ }
        <Route path="account-portal-create" component={AccountPortalCreate}/>
        <Route path="login" component={Login}/>
        <Route path="verify/registration" component={VerifyRegistration}/>
        <Route path="create-portal" component={CreatePortal}/>

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Route>
  );
};
