import mainRoutes from './routes/bare';
import authorRoutes from './routes/portal';

export default (store, subdomain) => {
  const requireLogin = (nextState, replace, cb) => {
    cb();
  };

  let routes = null;
  if (subdomain) {
    routes = authorRoutes({ requireLogin, subdomain });
  } else {
    routes = mainRoutes({ requireLogin });
  }
  return routes;
};
