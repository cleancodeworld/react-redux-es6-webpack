import React, { Component, PropTypes } from 'react';
import {
  ProfileCover,
  ProfileToolbar
} from 'components';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <ProfileCover />
        <ProfileToolbar />
        {this.props.children}
      </div>
    );
  }
}
