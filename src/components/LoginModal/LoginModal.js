import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import {LoginForm} from 'components';

export default class LoginModal extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onSubmit: PropTypes.func,
    onHide: PropTypes.func,
  }

  render() {
    const {show, onSubmit, onHide} = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          <LoginForm onSubmit={onSubmit}/>
        </Modal.Body>
      </Modal>
    );
  }
}
