import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class QuestionLayout extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    const style = { marginLeft: '2px' };

    return (
      <div>
        <div className="page-header">
          <div className="page-header-content">
            <div className="container">
              <div className="page-title pull-right">
                <Link to="/question" className="btn btn-flat bg-slate-300 legitRipple btn-xs">Questions</Link>
                <a href="#" style={style} className="btn btn-flat bg-slate-300 legitRipple btn-xs">Jobs</a>
                <a href="#" style={style} className="btn btn-flat bg-slate-300 legitRipple btn-xs">Tags</a>
                <a href="#" style={style} className="btn btn-flat bg-slate-300 legitRipple btn-xs">Users</a>
                <a href="#" style={style} className="btn btn-flat bg-slate-300 legitRipple btn-xs">Badges</a>
                <Link to="/question/ask" style={style} className="btn btn-flat bg-danger-300 legitRipple btn-xs">
                  Ask Question</Link>
              </div>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
