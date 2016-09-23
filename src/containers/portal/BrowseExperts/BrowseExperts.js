import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { withPortal } from 'hoc';
@withPortal
export default class BrowseExperts extends Component {

  static propTypes = {
    portal: PropTypes.object
  };

  render() {
    const {portal} = this.props;
    return (
      <div className="page-container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tabbable">
                    <div className="tab-content">
                      <div className="tab-pane fade in active" id="activity">
                        <div className="panel panel-body">
                          <ul className="media-list search-results-list content-group">
                            <li className="media stack-media-on-mobile">
                              <div className="media-left">
                                <div className="thumb">
                                  <a data-popup="lightbox" href="assets/images/placeholder.jpg">
                                    <img src={portal.meta.getIn(['owner', 'image'])}
                                         className="img-responsive img-rounded media-preview" alt=""/>
                                  </a>
                                </div>
                              </div>

                              <div className="media-body">
                                <h6 className="media-heading">
                                  <Link to="/call/expert/profile">
                                    {`${portal.meta.getIn(['owner', 'firstName'])} ${portal.meta.getIn(['owner', 'lastName'])}`}
                                  </Link>
                                </h6>
                                <ul className="list-inline list-inline-separate text-muted">
                                  <li><b>{portal.meta.getIn(['owner', 'username'])}</b></li>
                                </ul>
                              </div>

                              <div className="media-right text-center">
                                <h1 className="panel-title price"><b>$5.83</b></h1>
                                <small>per minute</small>
                                <Link to={`/call/expert`} className="btn btn-primary legitRipple mt-5 mb-5"
                                      type="button">Request a Call
                                  <i
                                    className="icon-arrow-right14 position-right"></i></Link>
                                <div className="text-muted">
                                  <i className="icon-star-full2 text-size-base text-warning-300"></i>
                                  <i className="icon-star-full2 text-size-base text-warning-300"></i>
                                  <i className="icon-star-full2 text-size-base text-warning-300"></i>
                                  <i className="icon-star-full2 text-size-base text-warning-300"></i>
                                  <i className="icon-star-full2 text-size-base text-warning-300"></i>
                                  <span>(75)</span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
