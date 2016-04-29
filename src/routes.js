import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import mainRoutes from './routes/main';
import authorRoutes from './routes/author';

export default (store, subdomain) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  let routes = null;
  if (subdomain) {
    routes = authorRoutes({ requireLogin, subdomain });
  } else {
    routes = mainRoutes({ requireLogin });
  }
  return routes;
};
