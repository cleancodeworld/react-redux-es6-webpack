import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import {SignupForm} from 'components';

export default class SignupModal extends Component {

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
          <SignupForm onSubmit={onSubmit}/>
        </Modal.Body>
      </Modal>
    );
  }
}
