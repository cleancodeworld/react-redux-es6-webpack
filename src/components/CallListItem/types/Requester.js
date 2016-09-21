import React from 'react';
import CallInfo from '../CallInfo';
const Requester = ({call}) => {
  return (
    <li className="media stack-media-on-mobile">
      <CallInfo call={call}>
        <div className="media-right text-center">
          <h1 className="panel-title price"><b>[$16.67]</b></h1>
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
      </CallInfo>
    </li>
  );
};
export default Requester;
