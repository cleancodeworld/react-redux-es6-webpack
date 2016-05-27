import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';

export default class LessonPreviewButton extends Component {

  static propTypes = {
    lesson: PropTypes.object.isRequired,
  }

  state = {
    showModal: false
  }

  render() {
    const {lesson} = this.props;
    return (
      <div>
        <a href="javascript:void(0)" onClick={()=>this.setState({ showModal: true })}
           className="btn btn-sm ud-popup ud-courseimpressiontracker preview-btn ml15 btn-primary legitRipple">Preview</a>
        <Modal show={this.state.showModal} onHide={()=>this.setState({ showModal: false })} bsSize="lg">
          <Modal.Header closeButton>
            <Modal.Title>{lesson.get('title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <YouTube videoId={getYouTubeID(lesson.get('videoUrl'))} className="text-center"/>
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
