import React from 'react';
import CallInfo from '../CallInfo';
const Requester = ({call}) => {
  return (
    <li className="media stack-media-on-mobile">
      <CallInfo call={call}>
        <div className="media-right text-center">
          <h1 className="panel-title price"><b>[$16.67]</b></h1>
          <small>per minute</small>
        </div>
      </CallInfo>
    </li>
  );
};
export default Requester;
