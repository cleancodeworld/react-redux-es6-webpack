import React from 'react';
import moment from 'moment';

const CallInfo = ({call, children}) => {
  const datesCount = call.get('availability') && call.get('availability').count() || 0;
  return (
    <div>
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
            Dates: {call.get('availability') && call.get('availability')
              .map((date, index)=> {
                const _date = moment(date).format('DD/MM/YYYY HH:mm');
                return datesCount - 1 !== index ? _date + ' - ' : _date;
              }) || '[]'}</li>
        </ul>
        [description]
      </div>
      {children}
    </div>
  );
};
export default CallInfo;
