import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Portal
} from '../containers/portal';
import {
  NotFound
} from '../containers/bare';

export default (params) => {
  const {subdomain} = params;
  return (
    <Route path="/" component={App} subdomain={subdomain}>
      { /* Sub routes */ }
      <IndexRoute component={Portal}/>

      { /* Sample component for dynamic subdomain routing */ }
      <Route path="portal/:portalname" component={Portal}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
