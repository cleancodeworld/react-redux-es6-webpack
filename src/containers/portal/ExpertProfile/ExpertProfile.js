import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { withPortal } from 'hoc';

@withPortal
export default class ExpertProfile extends Component {

  static propTypes = {
    portal: PropTypes.object
  };

  render() {
    const {portal} = this.props;
    const user = portal.meta.get('owner');
    debugger;
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="main-content">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-sm-8">
                  <div className="panel">
                    <div className="panel-body">
                      <ul className="media-list content-group">
                        <li className="media stack-media-on-mobile">
                          <div className="media-left">
                            <div className="thumb">
                              <a href="#" className="img-circle display-block overflow-hidden">
                                <img
                                  src={user.get('imageUrl')}
                                  className="img-responsive media-preview"
                                  alt=""/>
                              </a>
                            </div>
                          </div>
                          <div className="media-body">
                            <h1 className="media-heading"><a href="#">{user.get('firstName')} {user.get('lastName')}</a>
                            </h1>
                            <h4 className="media-sub-heading">{user.get('username')}</h4>

                            <ul className="list-inline list-inline-separate text-muted mb-5">
                              <li><i className="fa fa-map-marker"></i> [Montreal Canada]</li>
                            </ul>

                            <p>[Amazon FBA Consultant and Best Selling Author. New Product Launch. Delivered 8
                              Kickstarter
                              projects. Marketing strategist and investor.]</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4">
                  <div className="panel">
                    <div className="panel-body text-center">
                      <div className="h4"><big>$1</big>
                        <small> / min</small>
                      </div>
                      <p className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                        <span>(495)</span>
                      </p>
                      <p><Link to="/call/expert"
                               className="btn btn-labeled btn-labeled-right bg-blue heading-btn legitRipple full-width">Request
                        a call
                        <b><i className="fa fa-chevron-right"></i></b>
                        <span className="legitRipple-ripple"></span>
                        <span className="legitRipple-ripple"></span></Link>
                      </p>
                    </div>
                  </div>

                  <div className="panel bg-slate-300">
                    <div className="table-responsive text-center">
                      <table className="table text-no-wrap">
                        <tbody>
                        <tr>
                          <td>
                            <div><strong>6</strong></div>
                            <div>Calls</div>
                          </td>
                          <td>
                            <div><strong>2</strong></div>
                            <div>Reviews</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left" colSpan="2">
                            <ul className="list-inline">
                              <li>Verified</li>
                              <li className="pull-right">
                                <a href="#">
                                                                <span className="fa-stack fa-lg">
                                                                    <i className="fa fa-circle fa-stack-2x"></i>
                                                                    <i
                                                                      className="fa fa-phone fa-stack-1x fa-inverse"></i>
                                                                </span>
                                </a><a href="#">
                                                                <span className="fa-stack fa-lg">
                                                                    <i className="fa fa-circle fa-stack-2x"></i>
                                                                    <i
                                                                      className="fa fa-linkedin fa-stack-1x fa-inverse"></i>
                                                                </span>
                              </a><a href="#">
                                                                <span className="fa-stack fa-lg">
                                                                    <i className="fa fa-circle fa-stack-2x"></i>
                                                                    <i
                                                                      className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                                                </span>
                              </a><a href="#">
                                                                <span className="fa-stack fa-lg">
                                                                    <i className="fa fa-circle fa-stack-2x"></i>
                                                                    <i
                                                                      className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                                                </span>
                              </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="text-left profile-category-tags">
                            <a className="btn btn-default btn-xs legitRipple">
                              <small>Product Design</small>
                            </a>
                            <a className="btn btn-default btn-xs legitRipple">
                              <small>Marketing Strategy</small>
                            </a>
                            <a className="btn btn-default btn-xs legitRipple">
                              <small>Product Development</small>
                            </a>
                            <a className="btn btn-default btn-xs legitRipple">
                              <small>Book Publishing</small>
                            </a>
                            <a className="btn btn-default btn-xs legitRipple">
                              <small>Sourcing</small>
                            </a>
                            <a className="btn btn-default btn-xs legitRipple">
                              <small>Amazon</small>
                            </a>
                            <a className="btn btn-default btn-xs legitRipple">
                              <small>Amazon Kindle</small>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            Share on <a href="#">
                                                                <span className="fa-stack fa-lg">
                                                                    <i className="fa fa-square fa-stack-2x"></i>
                                                                    <i
                                                                      className="fa fa-phone fa-stack-1x fa-inverse"></i>
                                                                </span>
                          </a>
                            <a href="#">
                                                                <span className="fa-stack fa-lg">
                                                                    <i className="fa fa-square fa-stack-2x"></i>
                                                                    <i
                                                                      className="fa fa-linkedin fa-stack-1x fa-inverse"></i>
                                                                </span>
                            </a>
                            <a href="#">
                                                                <span className="fa-stack fa-lg">
                                                                    <i className="fa fa-square fa-stack-2x"></i>
                                                                    <i
                                                                      className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                                                </span>
                            </a>
                            and more
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="text-muted">
                            Member since February 2016
                          </td>
                        </tr>
                        </tbody>
                      </table>
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
