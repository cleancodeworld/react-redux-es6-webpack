import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {SET_REQ_SUBDOMAIN} from 'redux/modules/portal/current';

import {
  App,
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
  CoursesByCategory,
  WishList,
  Cart,
  CourseView,
  MyCourses,
  PortalLayout,
  Home,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../containers/portal';
import {
  Root,
  NotFound,
  Course,
  CheckOut,
} from '../containers/shared';

export default (params) => {
  const {store, subdomain} = params;
  store.dispatch({
    type: SET_REQ_SUBDOMAIN,
    subdomain: subdomain
  });
  return (
    <Route component={Root}>
      <Route name={<span><i className="icon-home2 position-left"/>Home</span>} staticName path="/" component={App}>
        <Route name="PortalLayout" staticName component={PortalLayout}>
          { /* Sub routes */ }
          <IndexRoute name="r1" component={Home}/>
          <Route name="Login" path="login" component={PortalLogin}/>
          <Route name="Wish list" path="wish-list" component={WishList}/>
          <Route name="Cart" path="cart" component={Cart}/>
          <Route name="My Courses" path="my-courses" component={MyCourses}/>

          <Route name="Courses" staticName path="courses">
            <IndexRoute name="Courses" staticName component={Home}/>
            <Route path=":categoryName" component={CoursesByCategory}/>
          </Route>
          <Route path="check-out" component={CheckOut}/>

          <Route name="Courses" path="course">
            <Route name="View" staticName path=":courseName" component={Course}>
              <IndexRoute component={CourseView}/>
            </Route>
          </Route>

          <Route name="Author" path="author" component={AuthorContainer}>
            <Route component={PortalAuthorLayout}>
              <IndexRoute component={Dashboard}/>
              <Route name="Course" path="course">
                <IndexRoute component={CourseList}/>
                <Route path="create" component={CourseCreate}/>
                <Route path="list" component={CourseList}/>
                <Route path=":courseName" component={Course}>
                  <Route component={PortalAuthorCourseLayout}>
                    <IndexRoute name="Goals" component={CourseEdit}/>
                    <Route name="Goals" path="goals" component={CourseEdit}/>
                    <Route name="Accounting" path="accounting" component={CourseAccounting}/>
                    <Route name="Lessons" path="lesson/list" component={LessonList}/>
                    <Route name="Create Lesson" path="lesson/add" component={LessonAdd}/>
                    <Route name="Edit Lesson" path="lesson/:lessonName/edit" component={LessonEdit}/>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          { /* Catch all route */ }
          <Route path="*" component={NotFound}/>
        </Route>
      </Route>
    </Route>
  );
};
