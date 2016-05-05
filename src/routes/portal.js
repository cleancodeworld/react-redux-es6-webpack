import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {SET_REQ_SUBDOMAIN} from 'redux/modules/portal';
import {
  App,
  Sample,
  LessonListContainer,
  LessonAdd,
  LessonEdit
  CourseCreate,
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
        <IndexRoute component={Sample}/>

        <Route path="course/:courseName" component={LessonListContainer}/>
        <Route path="course/:courseName/lesson/add" component={LessonAdd}/>
        <Route path="course/:courseName/lesson/:lessonName/edit" component={LessonEdit}/>
        <Route path="course/create" component={CourseCreate}/>

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Route>
  );
};
