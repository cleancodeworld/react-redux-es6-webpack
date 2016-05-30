import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import {StripeCheckOut} from 'components';


export default class CheckOutModal extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSuccess: PropTypes.func,
    course: PropTypes.object,
  }

  render() {
    const {show, onHide, course} = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          <StripeCheckOut amount={course.getIn(['coursePrice', 'price'])}
                          onSuccess={this.props.onSuccess}/>
        </Modal.Body>
      </Modal>
    );
  }
}
