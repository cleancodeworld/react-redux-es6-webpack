import React from 'react';
const VotingBar = ({onVoteUp, onVoteDown})=> {
  return (<div>
    <a href="javascript:void(0)" onClick={()=>onVoteUp()} className="icon-arrow-up5 icon-3x text-muted"></a>
    <h4 className="vote-count-post text-center panel-title icons-list">3</h4>
    <a href="javascript:void(0)" onClick={()=>onVoteDown()} className="icon-arrow-down5 icon-3x text-muted"></a>
  </div>);
};
export default VotingBar;
