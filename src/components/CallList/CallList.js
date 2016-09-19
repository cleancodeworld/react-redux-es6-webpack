import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class CallList extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const { entities, order} = this.props;
    return order.count() ? (
      <div>
        <ul className="media-list search-results-list content-group">
          {
            order.map(callId => {
              const call = entities.get(callId);
              const datesCount = call.get('AvailabilityDates').count();
              return (
                <li key={call.get('id')} className="media stack-media-on-mobile">
                  <div className="media-left">
                    <div className="thumb">
                      <a data-popup="lightbox" href="assets/images/placeholder.jpg">
                        <img src="/assets/images/placeholder.jpg" className="img-responsive img-rounded media-preview"
                             alt=""/>
                      </a>
                    </div>
                  </div>

                  <div className="media-body">
                    <h6 className="media-heading"><a href="#">{call.get('message')}</a></h6>
                    <ul className="list-inline list-inline-separate text-muted">
                      <li><b>Estimated </b><strong>{call.get('estimated')}</strong> <b> min</b></li>
                      <li>Available
                        Dates: {call.get('AvailabilityDates')
                          .map((date, index)=> {
                            const _date = moment(date).format('DD/MM/YYYY HH:mm');
                            return datesCount - 1 !== index ? _date + ' - ' : _date;
                          })}</li>
                    </ul>
                    [description]
                  </div>
                  <div className="media-right text-center">
                    <h1 className="panel-title price"><b>$16.67</b></h1>
                    <small>per minute</small>
                    <button className="btn btn-primary legitRipple mt-5 mb-5" type="button">Request a Call <i
                      className="icon-arrow-right14 position-right"></i></button>
                    <div className="text-muted">
                      <i className="icon-star-full2 text-size-base text-warning-300"></i>
                      <i className="icon-star-full2 text-size-base text-warning-300"></i>
                      <i className="icon-star-full2 text-size-base text-warning-300"></i>
                      <i className="icon-star-full2 text-size-base text-warning-300"></i>
                      <i className="icon-star-full2 text-size-base text-warning-300"></i>
                      <span>(64)</span>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    ) : (<div className="col-md-8 col-md-offset-2">
      <div className="content-group tab-content-bordered navbar-component">
        <div className="navbar navbar-default navbar-xs">
          <div className="navbar-collapse collapse">
            <div className="navbar-text h3">No courses yet</div>
          </div>
        </div>
      </div>
    </div> );
  }
}
