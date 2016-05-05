import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class LessonList extends Component {
  static propTypes = {
    lessons: PropTypes.array,
    courseName: PropTypes.string.isRequired,
  };

  render() {
    const courseName = this.props.courseName;
    let lessons = this.props.lessons;
    if (!lessons) {
      lessons = [];
    }
    return (
      <div className="panel panel-flat">
        <div className="panel-heading">
          <h6 className="panel-title">Lessons</h6>
          <div className="heading-elements">
            <Link to={'/course/' + courseName + '/lesson/add'} className="btn btn-warning btn-xs">Add Lesson <i className="icon-pen-plus position-right"></i></Link>
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
              {lessons.map((lesson) => {
                return (
                  <tr key={lesson.Id}>
                    <td className="col-md-6 col-sm-6">{lesson.title}</td>
                    <td className="col-md-3 col-sm-3">{lesson.CreatedAt}</td>
                    <td className="col-md-3 col-sm-3 text-center">
                      <ul className="icons-list">
                        <li className="text-primary-600"><Link to={'/course/' + courseName + '/lesson/' + lesson.Slug + '/edit'}><i className="icon-pencil7"></i></Link></li>
                        <li className="text-danger-600"><a href="#"><i className="icon-trash"></i></a></li>
                        <li className="text-teal-600"><a href="#"><i className="icon-cog7"></i></a></li>
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
