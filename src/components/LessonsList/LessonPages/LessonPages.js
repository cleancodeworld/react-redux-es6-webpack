import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class LessonPages extends Component {

  static propTypes = {
    show: PropTypes.bool,
    courseName: PropTypes.string,
    lesson: PropTypes.object,
  }

  render() {
    const {show, courseName, lesson} = this.props;
    return show
      ? (<tr>
      <td colSpan="3">
        <table className="table">
          <tbody>
          <tr>
            <td colSpan="3">
              <Link className="btn btn-primary btn-xs"
                    to={`/author/course/${courseName}/lesson/${lesson.get('slug')}/page/add`}>
                Add Page
                <i className="icon-pen-plus position-right"></i>
              </Link>
            </td>
          </tr>
          {
            lesson.getIn(['pages', 'order'])
              ?
              lesson.getIn(['pages', 'order']).map((slug)=> {
                const page = lesson.getIn(['pages', 'entities', slug]);
                return (
                  <tr key={slug}>
                    <td>
                      {page.get('title')}
                    </td>
                  </tr>);
              })
              :
              (<tr>
                <td>loading</td>
              </tr>)
          }
          </tbody>
        </table>
      </td>
    </tr>)
      : null;
  }
}
