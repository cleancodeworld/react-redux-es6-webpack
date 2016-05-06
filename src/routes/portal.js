import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {SET_REQ_SUBDOMAIN} from 'redux/modules/portal';
import {
  App,
  Dashboard,
  CourseManagerContainer,
  LessonListContainer,
  LessonAdd,
  LessonEdit,
  CourseCreate,
  CourseList,
} from '../containers/portal';
import {
  NotFound
} from '../containers/bare';

import Root from '../containers/Root/Root';

export default (params) => {
  const {store, subdomain} = params;
  store.dispatch({
    type: SET_REQ_SUBDOMAIN,
    subdomain: subdomain
  });
  return (
    <Route component={Root}>
      <Route path="/" component={App} subdomain={subdomain}>
        { /* Sub routes */ }
        <IndexRoute component={Dashboard}/>

        <Route path="course/create" component={CourseCreate}/>
        <Route path="course/list" component={CourseList}/>
        <Route path="course/:courseName" component={CourseManagerContainer}>
          <Route path="lesson/list" component={LessonListContainer}/>
          <Route path="lesson/add" component={LessonAdd}/>
          <Route path="lesson/:lessonName/edit" component={LessonEdit}/>
        </Route>

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Route>
  );
};
