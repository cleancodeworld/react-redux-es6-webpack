import React from 'react';
const CorrectAnswer = ({onCorrect})=> {
  return (<div>
    <a href="javascript:void(0)" onClick={()=>onCorrect()}
       className="icon-checkmark4 icon-2x display-block text-muted"></a>
  </div>);
};
export default CorrectAnswer;
