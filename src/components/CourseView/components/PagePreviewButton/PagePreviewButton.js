import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class LessonPreviewButton extends Component {

  static propTypes = {
    page: PropTypes.object.isRequired,
  }

  state = {
    showModal: false
  }

  render() {
    const {page} = this.props;
    return (
      <div>
        <a href="javascript:void(0)" onClick={()=>this.setState({ showModal: true })}
           className="btn btn-sm ud-popup ud-courseimpressiontracker preview-btn ml15 btn-primary legitRipple">Preview</a>
        <Modal show={this.state.showModal} onHide={()=>this.setState({ showModal: false })} bsSize="lg">
          <Modal.Header closeButton>
            <Modal.Title>{page.get('title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              Page
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.setState({ showModal: false })}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
