import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {SET_REQ_SUBDOMAIN} from 'redux/modules/portal';
import {
  App,
  Home,
  PortalLogin,
  Dashboard,
  LessonList,
  LessonAdd,
  LessonEdit,
  CourseCreate,
  CourseList,
  CourseEdit,
  CourseAuthorView,
} from '../containers/portal';
import {
  Root,
  NotFound,
} from '../containers/shared';

export default (params) => {
  const {store, subdomain, requireLogin} = params;
  store.dispatch({
    type: SET_REQ_SUBDOMAIN,
    subdomain: subdomain
  });
  return (
    <Route component={Root}>
      <Route path="/" component={App}>
        { /* Sub routes */ }
        <IndexRoute component={Home}/>

        <Route path="login" component={PortalLogin}/>
        <Route path="author" onEnter={requireLogin}>
          <IndexRoute component={Dashboard}/>
          <Route path="course">
            <Route path="create" component={CourseCreate}/>
            <Route path="list" component={CourseList}/>
            <Route path=":courseName">
              <IndexRoute component={CourseAuthorView}/>
              <Route path="goals" component={CourseEdit}/>
              <Route path="lesson/list" component={LessonList}/>
              <Route path="lesson/add" component={LessonAdd}/>
              <Route path="lesson/:lessonName/edit" component={LessonEdit}/>
            </Route>
          </Route>
        </Route>
        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Route>
  );
};
