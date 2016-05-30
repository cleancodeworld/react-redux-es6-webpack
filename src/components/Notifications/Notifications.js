import React, {PropTypes} from 'react';

import {connect} from 'react-redux';

import {hide} from 'redux/modules/notifications';

import NotifySystem from 'react-notification-system';
@connect(state=>({
  notifications: state.notifications
}), { hide })
export default class Notifications extends React.Component {

  static propTypes = {
    notifications: PropTypes.object,
    hide: PropTypes.func
  }


  componentWillReceiveProps(nextProps) {
    const {notifications} = nextProps;
    notifications.forEach(notification=> {
      this.system().addNotification({
        ...notification.toJS(),
        onRemove: () => {
          this.props.hide(notification.get('uid'));
        }
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  system() {
    return this.refs.notify;
  }

  render() {
    return (
      <NotifySystem ref="notify"/>
    );
  }
}

Notifications.contextTypes = {
  store: PropTypes.object
};
