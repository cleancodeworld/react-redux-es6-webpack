import React, { Component } from 'react';

export default class BrowseExperts extends Component {

  static propTypes = {};

  render() {
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
                                    <img src="assets/images/placeholder.jpg"
                                         className="img-responsive img-rounded media-preview" alt=""/>
                                  </a>
                                </div>
                              </div>

                              <div className="media-body">
                                <h6 className="media-heading"><a href="#">Email Marketing</a></h6>
                                <ul className="list-inline list-inline-separate text-muted">
                                  <li><b>Seth Berman</b></li>
                                  <li>San Francisco, CA</li>
                                </ul>
                                I tripled Redbubble email subscribers, increased Redbubble sales from email by 150% and grew
                                BabyCenter email subscribers to 10 million.
                              </div>

                              <div className="media-right text-center">
                                <h1 className="panel-title price"><b>$5.83</b></h1>
                                <small>per minute</small>
                                <button className="btn btn-primary legitRipple mt-5 mb-5" type="button">Request a Call <i
                                  className="icon-arrow-right14 position-right"></i></button>
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
                          <div className="text-center pb-10 pt-10">
                            <button className="btn btn-default btn-loading legitRipple"
                                    data-loading-text="<i className='icon-spinner4 spinner position-left'></i> Load more"
                                    type="button"><i className="icon-spinner4 position-left"></i> Load more<span
                              className="legitRipple-ripple"></span>
                            </button>
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
      </div>
    );
  }
}
