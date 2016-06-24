import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import {StripeCheckOut} from 'components';


export default class CheckOutModal extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSuccess: PropTypes.func,
    amount: PropTypes.number,
  }

  render() {
    const {show, onHide, amount} = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          <StripeCheckOut amount={amount}
                          onSuccess={this.props.onSuccess}/>
        </Modal.Body>
      </Modal>
    );
  }
}
