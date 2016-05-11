import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { LessonListItem } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
import { isLoaded, load as loadLessons } from 'redux/modules/lesson/loaded';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    if (!isLoaded(getState(), params.courseName)) {
      promises.push(dispatch(loadLessons(params.courseName)));
    }
    return Promise.all(promises);
  }
}])

@connect(
  ({lessonLoaded, courseEdit}, ownProps) => ({
    list: lessonLoaded.get(ownProps.params.courseName),
    course: courseEdit.get('course')
  })
)
export default class LessonList extends Component {

  static propTypes = {
    list: PropTypes.object,
    course: PropTypes.object,
    params: PropTypes.object.isRequired,
  };

  render() {
    const {courseName} = this.props.params;
    const {list, course, params} = this.props;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: `/author/course/${courseName}`, name: course.get('name') },
      { url: `/author/course/${courseName}/lesson/list`, name: 'Lessons' },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={params}>
              <div className="panel panel-flat">
                <div className="panel-heading">
                  <h6 className="panel-title">Lessons</h6>
                  <div className="heading-elements">
                    <Link to={'/author/course/' + courseName + '/lesson/add'} className="btn btn-warning btn-xs">Add
                      Lesson <i className="icon-pen-plus position-right"></i></Link>
                  </div>
                </div>
                <div className="panel-body">
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-lg">
                    <thead>
                    <tr className="bg-blue">
                      <th className="col-md-6 col-sm-6">Lesson Title</th>
                      <th className="col-md-3 col-sm-3">Last Modified</th>
                      <th className="col-md-3 col-sm-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(lesson => {
                      return (<LessonListItem key={lesson.get('Id')} lesson={lesson} courseName={courseName}/>);
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
