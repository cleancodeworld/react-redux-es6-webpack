import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {SET_REQ_SUBDOMAIN} from 'redux/modules/portal/current';

import {
  App,
  Dashboard,
  LessonList,
  LessonAdd,
  LessonEdit,
  CourseCreate,
  CoursesByPortal,
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
  PageCreate,
  PageEdit,
  Courses,
  QuestionAsk,
  QuestionDetailsView,
  QuestionLayout,
  QuestionsByPortal,
  QuestionEdit,
  RequestCallLayout,
  BrowseExperts,
  ExpertProfile,
  CallCreate,
  MyCalls,
} from '../containers/portal';
import {
  Root,
  NotFound,
  Course,
  Question,
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
          <IndexRoute name="Index" component={Home}/>
          <Route path="question" name="Questions" component={QuestionLayout}>
            <IndexRoute component={QuestionsByPortal}/>
            <Route name="Question Ask" path="ask" component={QuestionAsk}/>
            <Route name="Question View" staticName path=":questionShortId/:questionName" component={Question}>
              <IndexRoute name="Question" component={QuestionDetailsView}/>
              <Route name="Question Edit" path="edit" component={QuestionEdit}/>
            </Route>
          </Route>
          <Route path="request-call" name="Request Call" component={RequestCallLayout}>
            <IndexRoute component={BrowseExperts}/>
            <Route name="Expert Profile" path="profile" component={ExpertProfile}/>
            <Route name="Request Call" path=":id/:username" component={CallCreate}/>
          </Route>
          <Route name="My Calls" path="my-calls" component={MyCalls}/>
          <Route name="Wish list" path="wish-list" component={WishList}/>
          <Route name="Cart" path="cart" component={Cart}/>
          <Route name="My Courses" path="my-courses" component={MyCourses}/>
          <Route name="Courses" staticName path="courses">
            <IndexRoute name="Courses" staticName component={Home}/>
            <Route name="Category" path=":categoryName" component={CoursesByCategory}/>
          </Route>
          <Route name="Checkout" path="check-out" component={CheckOut}/>

          <Route name="Courses" path="course">
            <IndexRoute name="Courses" component={Courses}/>
            <Route name="View" staticName path=":courseName" component={Course}>
              <IndexRoute component={CourseView}/>
            </Route>
          </Route>

          <Route name="Author" path="author" component={AuthorContainer}>
            <Route component={PortalAuthorLayout}>
              <IndexRoute component={Dashboard}/>
              <Route name="Course" path="course">
                <IndexRoute component={CoursesByPortal}/>
                <Route name="Create" path="create" component={CourseCreate}/>
                <Route name="List" path="list" component={CoursesByPortal}/>
                <Route name="View" path=":courseName" component={Course}>
                  <Route component={PortalAuthorCourseLayout}>
                    <IndexRoute name="Goals" component={CourseEdit}/>
                    <Route name="Goals" path="goals" component={CourseEdit}/>
                    <Route name="Accounting" path="accounting" component={CourseAccounting}/>
                    <Route name="Lessons" path="lesson/list" component={LessonList}/>
                    <Route name="Create Lesson" path="lesson/add" component={LessonAdd}/>
                    <Route name="Edit Lesson" path="lesson/:lessonName/edit" component={LessonEdit}/>
                    <Route name="Create Page" path="lesson/:lessonName/page/add" component={PageCreate}/>
                    <Route name="Edit Page" path="lesson/:lessonName/page/:pageName/edit" component={PageEdit}/>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          { /* Catch all route */ }
          <Route name="Not Found" path="*" component={NotFound}/>
        </Route>
      </Route>
    </Route>
  );
};
