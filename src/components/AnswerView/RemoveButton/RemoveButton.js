import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class LessonRemoveButton extends Component {

  static propTypes = {
    answer: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  state = {
    showModal: false
  }

  render() {
    const {answer, onRemove} = this.props;
    return (
      <div>
        <a href="javascript:void(0)" onClick={()=>this.setState({ showModal: true })}>
          Delete</a>
        <Modal show={this.state.showModal} onHide={()=>this.setState({ showModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Remove confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete this answer?</h4>
            <div dangerouslySetInnerHTML={(()=>({__html: answer.get('content')}))()}/>
            <p>Note: you can not rollback after you click confirm</p>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-danger"
                    onClick={()=>{
                      onRemove();
                      this.setState({ showModal: false });
                    }}>Confirm</Button>

            <Button onClick={()=>this.setState({ showModal: false })}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
