import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Home,
  AccountPortalCreate,
  VerifyRegistration,
  CreatePortal,
  PasswordForget,
  PasswordReset,
} from '../containers/bare';
import {
  Login,
  Root,
  NotFound,
} from '../containers/shared';


export default (params) => {
  const {requireLogin} = params;

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
        <Route onEnter={requireLogin}>
          <Route path="create-portal" component={CreatePortal}/>
        </Route>
        <Route path="password/forget" component={PasswordForget}/>
        <Route path="password/reset" component={PasswordReset}/>
        <Route path="verify/registration" component={VerifyRegistration}/>

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Route>
  );
};
