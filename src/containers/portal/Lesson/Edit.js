import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { LessonForm } from 'components';
import { editLesson } from 'redux/modules/lessons/lessons';
import { load as loadLesson } from 'redux/modules/lessons/edit';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    const promises = [];
    if (params.lessonName) {
      promises.push(dispatch(loadLesson(params.lessonName)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ lessonEdit: state.lessonEdit }),
  { editLesson }
)
export default class LessonEdit extends Component {
  static propTypes = {
    lessonEdit: PropTypes.object,
    editLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  render() {
    const {courseName, lessonName} = this.props.params;
    const {lessonEdit} = this.props;
    const lesson = lessonEdit.get('lesson');
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
