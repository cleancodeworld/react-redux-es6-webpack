import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { load as loadCourse, isLoaded as isCourseLoaded } from 'redux/modules/course/loaded';

export const requireLogin = (store, nextState, replace, cb) => {
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

export const requireLoadCourse = (store, nextState, replace, cb) => {
  const {courseName} = nextState.params;

  function checkAuth() {
    const { courseLoaded } = store.getState();
    const course = courseLoaded.getIn(['entities', courseName]);
    if (!course) {
      replace('/not-found');
    }
    cb();
  }

  if (!isCourseLoaded(store.getState(), courseName)) {
    store.dispatch(loadCourse(courseName))
      .then(checkAuth)
      .catch(checkAuth);
  } else {
    checkAuth();
  }
};

