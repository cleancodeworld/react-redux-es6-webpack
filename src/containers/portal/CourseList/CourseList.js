import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import {CourseListItem} from 'components';
import { load, isLoaded } from 'redux/modules/course/list';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isLoaded(state)) {
      promises.push(dispatch(load(state.auth.get('user').get('username'))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({courseList}) => ({
    list: courseList.get('list'),
    author: courseList.get('author')
  }),
  null
)
export default class CourseList extends Component {

  static propTypes = {
    list: PropTypes.object,
    author: PropTypes.object,
  };

  render() {
    const {list, author} = this.props;
    return (
      <div>
        <Helmet title="Home"/>
        <div className="content-group">
          <h6 className="text-semibold">Course List </h6>
        </div>
        <div className="content-group">
          <Link to="/course/create" className="btn bg-blue">Create Course</Link>
        </div>
        <div className="row">
          {list.map(course=> {
            return (<CourseListItem key={course.get('Id')} course={course} author={author}/>);
          })}
        </div>
      </div>
    );
  }
}
