import bareRoutes from './routes/bare';
import portalRoutes from './routes/portal';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

export default (store, subdomain) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth } = store.getState();
      if (!auth.get('user')) {
        // oops, not logged in, so can't be here!
        let continueTo = nextState.location.pathname + nextState.location.search;
        continueTo = encodeURIComponent(continueTo);
        replace('/login?continueTo=' + continueTo);
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth())
        .then(checkAuth)
        .catch(checkAuth);
    } else {
      checkAuth();
    }
  };

  let routes = null;
  if (subdomain) {
    routes = portalRoutes({ store, subdomain, requireLogin });
  } else {
    routes = bareRoutes({ requireLogin });
  }
  return routes;
};
