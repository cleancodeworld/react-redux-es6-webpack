import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { requireLogin } from './permissions';
import {
  App,
  Home,
  AccountPortalCreate,
  VerifyRegistration,
  CreatePortal,
  PasswordForget,
  PasswordReset,
  Login,
  MyPortals,
  SitePage,
} from '../containers/bare';
import {
  Root,
  NotFound,
} from '../containers/shared';


export default (params) => {
  const {store} = params;

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
        <Route onEnter={(nextState, replace, cb)=>requireLogin(store, nextState, replace, cb)}>
          <Route path="create-portal" component={CreatePortal}/>
          <Route path="portals/my" component={MyPortals}/>
        </Route>
        <Route path="password/forget" component={PasswordForget}/>
        <Route path="password/reset" component={PasswordReset}/>
        <Route path="verify/registration" component={VerifyRegistration}/>
        <Route path="page/:sitePageName/:sitePageId" component={SitePage}/>
        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Route>
  );
};
