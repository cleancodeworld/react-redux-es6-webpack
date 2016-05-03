import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Home,
  NotFound,
  AccountPortalCreate,
  Login,
  VerifyRegistration,
} from '../containers/bare';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="account-portal-create" component={AccountPortalCreate}/>
      <Route path="login" component={Login}/>
      <Route path="verify/registration" component={VerifyRegistration}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
