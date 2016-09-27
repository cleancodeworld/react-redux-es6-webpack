import React from 'react';
import {Link} from 'react-router';
import CallInfo from '../CallInfo';
const Expert = ({call}) => {
  let status;
  switch (call.get('status')) {
    case 'pending':
      status = (<div>
        <Link className="btn btn-primary legitRipple mt-5 mb-5"
              to={`/call/${call.get('id')}/accepted_by_expert`}>Approve <i
          className="icon-arrow-right14 position-right"></i></Link>
        <Link className="btn btn-danger legitRipple mt-5 mb-5"
              to={`/call/${call.get('id')}/rejected_by_expert`}>Reject <i
          className="icon-arrow-right14 position-right"></i></Link>
      </div>);
      break;
    case 'accepted_by_expert':
      status = (<button disabled className="btn btn-primary legitRipple mt-5 mb-5 disabled">Approved</button>);
      break;
    case 'done':
      status = (<div>
        <Link className="btn btn-primary legitRipple mt-5 mb-5"
              to={`/call/${call.get('id')}/done`}>Post feedback<i
          className="icon-arrow-right14 position-right"></i></Link>
      </div>);
      break;
    case 'rejected_by_expert':
      status = (<button disabled className="btn btn-danger legitRipple mt-5 mb-5 disabled">Rejected</button>);
      break;
    default:
      status = (<span/>);
      break;
  }
  return (
    <li className="media stack-media-on-mobile">
      <CallInfo call={call}>
        <div className="media-right text-center">
          <h1 className="panel-title price"><b>[$16.67]</b></h1>
          <small>per minute</small>
          {status}
          <div className="text-muted">
            <i className="icon-star-full2 text-size-base text-warning-300"></i>
            <i className="icon-star-full2 text-size-base text-warning-300"></i>
            <i className="icon-star-full2 text-size-base text-warning-300"></i>
            <i className="icon-star-full2 text-size-base text-warning-300"></i>
            <i className="icon-star-full2 text-size-base text-warning-300"></i>
            <span>(64)</span>
          </div>
        </div>
      </CallInfo>
    </li>
  );
};
export default Expert;
