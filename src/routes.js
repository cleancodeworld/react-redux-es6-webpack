import bareRoutes from './routes/bare';
import portalRoutes from './routes/portal';

export default (store, subdomain) => {
  const requireLogin = (nextState, replace, cb) => {
    cb();
  };

  let routes = null;
  if (subdomain) {
    routes = portalRoutes({ store, subdomain });
  } else {
    routes = bareRoutes({ requireLogin });
  }
  return routes;
};
