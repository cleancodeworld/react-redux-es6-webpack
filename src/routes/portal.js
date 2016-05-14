import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {SET_REQ_SUBDOMAIN} from 'redux/modules/portal/current';

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
  CourseAccounting,
  AuthorContainer,
} from '../containers/portal';
import {
  Root,
  NotFound,
  Course
} from '../containers/shared';

export default (params) => {
  const {store, subdomain} = params;
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
        <Route path="author" component={AuthorContainer}>
          <IndexRoute component={Dashboard}/>
          <Route path="course">
            <IndexRoute component={CourseList}/>
            <Route path="create" component={CourseCreate}/>
            <Route path="list" component={CourseList}/>
            <Route path=":courseName" component={Course}>
              <IndexRoute component={CourseEdit}/>
              <Route path="goals" component={CourseEdit}/>
              <Route path="accounting" component={CourseAccounting}/>
              <Route path="lesson/list" component={LessonList}/>
              <Route path="lesson/add" component={LessonAdd}/>
              <Route path="lesson/:lessonName/edit" component={LessonEdit}/>
            </Route>
          </Route>
        </Route>
        { /* Catch all route */ }
        <Route path="*" component={NotFound}/>
      </Route>
    </Route>
  );
};
