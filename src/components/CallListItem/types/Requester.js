import React from 'react';
import { Link } from 'react-router';
import CallInfo from '../CallInfo';
const Requester = ({call}) => {
  let status;
  switch (call.get('status')) {
    case 'pending':
      status = (<div>
        <button disabled className="btn btn-primary legitRipple mt-5 mb-5 disabled">Pending</button>
      </div>);
      break;
    case 'accepted_by_expert':
      status = (<button disabled className="btn btn-primary legitRipple mt-5 mb-5 disabled">Approved</button>);
      break;
    case 'done':
      status = (<div>
        <Link className="btn btn-primary legitRipple mt-5 mb-5"
              to={`/call/${call.get('id')}/done`}>Post feedback</Link>
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
        </div>
      </CallInfo>
    </li>
  );
};
export default Requester;
