import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {RemoveButton} from './RemoveButton/RemoveButton';
import moment from 'moment';

export default class LessonListItem extends Component {

  static propTypes = {
    lesson: PropTypes.object,
    courseName: PropTypes.string,
    onRemove: PropTypes.func,
    onShowLessonPages: PropTypes.func,

  }

  render() {
    const {lesson, courseName, onRemove, onShowLessonPages} = this.props;
    const createdAt = lesson.get('createdAt');
    return (<tr>
        <td className="col-md-6 col-sm-6">{lesson.get('title')}</td>
        <td className="col-md-3 col-sm-3">{moment(createdAt).format('L')}</td>
        <td className="col-md-3 col-sm-3 text-center">
          <ul className="icons-list">
            <li className="text-primary-600">
              <Link
                to={`/author/course/${courseName}/lesson/${lesson.get('slug')}/edit`}><i
                className="icon-pencil7"></i></Link>
            </li>
            <li>
              <RemoveButton lesson={lesson}
                                  onRemove={()=> onRemove(courseName, lesson.get('slug'))}/>
            </li>
            <li className="text-teal-600">
              <a onClick={()=> onShowLessonPages(lesson.get('slug'))} href="javascript:void(0)">
                <i className="icon-cog7"></i>
              </a>
            </li>
          </ul>
        </td>
      </tr>
    );
  }
}
