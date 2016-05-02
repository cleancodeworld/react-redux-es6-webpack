import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {SET_REQ_SUBDOMAIN} from 'redux/modules/portal';
import {
  App,
  Portal
} from '../containers/portal';
import {
  NotFound
} from '../containers/bare';

export default (params) => {
  const {store, subdomain} = params;
  store.dispatch({
    type: SET_REQ_SUBDOMAIN,
    subdomain: subdomain
  });
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
