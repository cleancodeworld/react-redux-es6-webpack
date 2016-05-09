import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { load } from 'redux/modules/course/edit';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    const state = getState();
    if (params.courseName !== '') {
      promises.push(dispatch(load(params.courseName)));
    }
    return Promise.all(promises);
  }
}])
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
