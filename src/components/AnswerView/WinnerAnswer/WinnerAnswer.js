import React from 'react';
import classnames from 'classnames';

const CorrectAnswer = ({onWinner, isWinner})=> {
  return (<div>
    <a href="javascript:void(0)" onClick={()=>onWinner()}
       className={classnames('icon-checkmark4', 'icon-2x', 'display-block', {'text-muted': !isWinner} )}></a>
  </div>);
};
export default CorrectAnswer;
