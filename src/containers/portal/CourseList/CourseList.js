import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseListItem} from 'components';
import { connect } from 'react-redux';
import { load, isLoaded } from 'redux/modules/course/list';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isLoaded(state)) {
      promises.push(dispatch(load(state.auth.get('username'))));
    }
    return Promise.all(promises);
  }
}])
@connect(({courseList}) => ({ list: courseList.get('list') }), null)
export default class CourseList extends Component {

  static propTypes = {
    list: PropTypes.object,
  };

  render() {
    const list = this.props.list;
    return (
      <div>
        <Helmet title="Home"/>
        {list.map(course=> {
          return (<CourseListItem key={course.get('Id')} course={course}/>);
        })}
      </div>
    );
  }
}
