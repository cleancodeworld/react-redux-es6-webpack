import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import { LessonsList } from 'components';
import { remove as removeLesson } from 'redux/modules/lesson/remove';
import { load as loadPages, isLoad as isLoadPages } from 'redux/modules/page/loaded';
import {withLessons, withCourse} from 'hoc';

@connect(
  null,
  {
    removeLesson,
    loadPages,
    isLoadPages,
  }
)

@withCourse
@withLessons
export default class LessonListContainer extends Component {

  static propTypes = {
    lessons: PropTypes.object,
    course: PropTypes.object,
    params: PropTypes.object.isRequired,
    removeLesson: PropTypes.func.isRequired,
    loadPages: PropTypes.func.isRequired,

  };

  static pageHeader = {
    title: '- Lessons',
    boldTitle: 'Course'
  };

  render() {
    const {params: { courseName }, lessons, course} = this.props;

    return (
      <div>
        <Helmet title={`${course.get('name')} lessons`}/>
        <div className="panel panel-flat">
          <div className="panel-heading">
            <h6 className="panel-title">Lessons</h6>
            <div className="heading-elements">
              <Link to={'/author/course/' + courseName + '/lesson/add'} className="btn btn-warning btn-xs">Add
                Lesson <i className="icon-pen-plus position-right"></i></Link>
            </div>
          </div>
          <LessonsList lessons={lessons}
                       onLoadPages={(lessonName) => this.props.loadPages(courseName, lessonName) }
                       onRemove={this.props.removeLesson} courseName={courseName}/>
        </div>
      </div>
    );
  }
}
