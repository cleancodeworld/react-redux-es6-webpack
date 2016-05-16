import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router';

export default class SignupModal extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
  }

  render() {
    const {show, onHide} = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          <div className="text-center">
            <div className="icon-object border-success text-success"><i className="icon-plus3"></i></div>
            <h5 className="content-group-lg">Sign Up For an Account
              <small className="display-block">All fields are required</small>
            </h5>
          </div>
          <div className="form-group has-feedback">
            <div>
              <input type="text" className="form-control" placeholder="Choose username"/>
            </div>
            <div className="form-control-feedback">
              <i className="icon-user-plus text-muted"></i>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <div>
                  <input type="text" className="form-control" placeholder="First name"/>
                </div>
                <div className="form-control-feedback">
                  <i className="icon-user-check text-muted"></i>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <div>
                  <input type="text" className="form-control" placeholder="Last name"/>
                </div>
                <div className="form-control-feedback">
                  <i className="icon-user-check text-muted"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <div>
                  <input type="password" className="form-control" placeholder="Create password"/>
                </div>
                <div className="form-control-feedback">
                  <i className="icon-user-lock text-muted"></i>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group has-feedback">
                <div>
                  <input type="password" className="form-control" placeholder="Repeat password"/>
                </div>
                <div className="form-control-feedback">
                  <i className="icon-user-lock text-muted"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group has-feedback">
            <div>
              <input type="text" className="form-control" placeholder="Email"/>
            </div>
            <div className="form-control-feedback">
              <i className="icon-mention text-muted"></i>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/login" className="btn btn-link pull-left" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <i className="icon-arrow-left13 position-left"></i> Already have an account? click to login
          </Link>
          <button type="submit" className="btn bg-teal-400 ml-10 pull-right">
            Sign Up
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
