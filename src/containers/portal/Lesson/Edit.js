import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { LessonForm } from 'components';
import { connect } from 'react-redux';
import { editLesson } from 'redux/modules/lessons';

@connect(
  state => ({ lessons: state.lessons }),
  { editLesson }
)
export default class LessonEdit extends Component {
  static propTypes = {
    lessons: PropTypes.object,
    editLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  render() {
    const {courseName, lessonName} = this.props.params;
    let lessons = this.props.lessons.get('lessons');
    if (typeof lessons.toJS !== 'undefined') {
      lessons = lessons.toJS();
    }
    let lesson = {};
    lessons.map(_lesson => {
      if (_lesson.Slug === lessonName) {
        lesson = _lesson;
      }
    });
    return (
      <div className="row">
        <Helmet title="Edit"/>
        Edit lesson
        <div className="col-lg-9">
          <div className="tabbable">
            <div className="tab-content">
              <div className="tab-pane fade in active" id="activity">
                <LessonForm lesson={lesson} onSubmit={ model => this.props.editLesson(model, lesson.courseId, courseName, lessonName)} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="panel panel-flat">
            <div className="panel-heading">
              <h6 className="panel-title">Navigation</h6>
            </div>
            <div className="list-group no-border no-padding-top">
              <a href="knexpert-%20course-goals.html" className="list-group-item"><i className="icon-user"></i> Goals</a>
              <a href="knexpert-%20course-accounting.html" className="list-group-item"><i className="icon-cash3"></i> Accounting</a>
              <a href="knexpert-%20course-curriculum.html" className="list-group-item"><i className="icon-tree7"></i> Curriculum <span className="badge bg-danger pull-right">2</span></a>
              <a href="#" className="list-group-item"><i className="icon-users"></i> SEO</a>
              <div className="list-group-divider"></div>
              <a href="#" className="list-group-item"><i className="icon-calendar3"></i> Co-Authors<span className="badge bg-teal-400 pull-right">48</span></a>
              <a href="#" className="list-group-item"><i className="icon-cog3"></i> Metrics</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
