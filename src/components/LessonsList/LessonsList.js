import React, {Component, PropTypes}from 'react';
import LessonListItem from './LessonListItem/LessonListItem';
import LessonPages from './LessonPages/LessonPages';

export default class LessonListContainer extends Component {

  static propTypes = {
    lessons: PropTypes.object,
    courseName: PropTypes.string,
    onRemove: PropTypes.func,
  }

  state = {
    selectedLessonPages: null
  };

  showLessonPages = (lesson)=> {
    this.setState({ selectedLessonPages: this.state.selectedLessonPages === lesson ? null : lesson });
  }

  render() {
    const {lessons, courseName, onRemove} = this.props;
    return (
      <div className="table-responsive">
        <table className="table table-hover table-lg">
          <thead>
          <tr className="bg-blue">
            <th className="col-md-6 col-sm-6">Lesson Title</th>
            <th className="col-md-3 col-sm-3">Last Modified</th>
            <th className="col-md-3 col-sm-3"></th>
          </tr>
          </thead>
          <tbody>
          {lessons.order.map(lesson => {
            return ([
              <LessonListItem key={lessons.entities.getIn([lesson, 'id'])}
                              lesson={lessons.entities.get(lesson)}
                              onRemove={onRemove}
                              onShowLessonPages={(lsn)=> this.showLessonPages(lsn)}
                              courseName={courseName}/>,
              <LessonPages show={lesson === this.state.selectedLessonPages}
                           lesson={lessons.entities.get(lesson)}
                           courseName={courseName}
                           key={`${lessons.entities.getIn([lesson, 'id'])}-pages`}/>]);
          })}
          </tbody>
        </table>
      </div>
    );
  }
}
