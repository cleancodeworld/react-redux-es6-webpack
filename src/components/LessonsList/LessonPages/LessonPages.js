import React, {Component, PropTypes} from 'react';

export default class LessonPages extends Component {

  static propTypes = {
    show: PropTypes.bool,
  }

  render() {
    const {show} = this.props;
    return show
      ? (<tr>
      <td colSpan="3">
        <table className="table">
          <tbody>
          <tr>
            <td colSpan="3">
              <strong>Pages</strong>
            </td>
          </tr>
          <tr>
            <td>
              Page Number One
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>)
      : null;
  }
}
