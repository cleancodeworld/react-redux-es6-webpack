import bareRoutes from './routes/bare';
import portalRoutes from './routes/portal';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { isLoaded as isPortalLoaded, load as loadPortal } from 'redux/modules/portal/current';

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

  const requirePortalOwner = (nextState, replace, cb) => {
    function checkAuth() {
      const { portalCurrent, auth } = store.getState();
      const userId = auth.getIn(['user', 'userId']);
      const ownerId = portalCurrent.getIn(['meta', 'ownerId']);
      if (ownerId !== userId) {
        // oops, not logged in, so can't be here!
        let continueTo = nextState.location.pathname + nextState.location.search;
        continueTo = encodeURIComponent(continueTo);
        replace('/login?continueTo=' + continueTo);
      }
      cb();
    }

    if (!isPortalLoaded(store.getState())) {
      const {portalCurrent} = store.getState();
      store.dispatch(loadPortal(portalCurrent.get('reqSubdomain')))
        .then(checkAuth)
        .catch(checkAuth);
    } else {
      checkAuth();
    }
  };

  let routes = null;
  if (subdomain) {
    routes = portalRoutes({ store, subdomain, requireLogin, requirePortalOwner });
  } else {
    routes = bareRoutes({ requireLogin, requirePortalOwner });
  }
  return routes;
};
