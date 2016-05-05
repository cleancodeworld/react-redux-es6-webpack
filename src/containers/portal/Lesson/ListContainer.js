import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { LessonList } from 'components';
import { isLoaded, load as loadLessons } from 'redux/modules/lessons/lessons';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(loadLessons(params.courseName)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ lessons: state.lessons })
)
export default class LessonListContainer extends Component {
  static propTypes = {
    lessons: PropTypes.object,
    params: PropTypes.object.isRequired,
  };

  render() {
    const {courseName} = this.props.params;
    let lessons = this.props.lessons.get('lessons');
    if (typeof lessons.toJS !== 'undefined') {
      lessons = lessons.toJS();
    }
    return (
      <div className="row">
        <Helmet title="Lesson List"/>
        <div className="col-lg-9">
          <div className="tabbable">
            <div className="tab-content">
              <div className="tab-pane fade in active" id="activity">
                <div className="panel panel-flat">
                  <div className="panel-heading">
                    <h6 className="panel-title">Curriculum Details</h6>
                  </div>
                  <div className="panel-body">
                    <form action="#">
                      <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="curriculum-title" className="form-control" placeholder="Title" />
                      </div>
                      <div className="form-group">
                        <label className="display-block">Upload video / image</label>
                        <input type="file" className="file-styled" />
                        <span className="help-block">Accepted formats: mp4, mpg, flv, gif, png, jpg. Max file size 2Mb</span>
                      </div>
                      <div className="form-group">
                        <label>Media information</label>
                        <textarea cols="5" rows="5" className="wysihtml5 wysihtml5-min form-control" placeholder="Enter text ...">
                        </textarea>
                      </div>
                      <div className="form-group">
                        <label>Curriculum description</label>
                        <textarea cols="10" rows="10" className="wysihtml5 wysihtml5-min form-control" placeholder="Enter text ...">
                        </textarea>
                      </div>
                      <div className="text-right">
                        <button type="submit" className="btn btn-primary">Save <i className="icon-arrow-right14 position-right"></i></button>
                      </div>
                    </form>
                  </div>
                </div>
                <LessonList lessons={lessons} courseName={courseName} />
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
