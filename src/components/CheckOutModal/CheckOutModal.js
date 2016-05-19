import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import {StripeCheckout} from 'components';
import {connect} from 'react-redux';
import {add as addToMyCourses} from 'redux/modules/myCourses';

@connect(null, { addToMyCourses })

export default class CheckOutModal extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    addToMyCourses: PropTypes.func,
    course: PropTypes.object,
  }

  render() {
    const {show, onHide, course} = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          <StripeCheckout onSuccess={(token)=> this.props.addToMyCourses(course.get('slug'), course.get('id'), token.id)}/>
        </Modal.Body>
      </Modal>
    );
  }
}
