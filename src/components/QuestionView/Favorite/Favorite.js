import React from 'react';
const Favorite = ({onFavorite})=> {
  return (<div>
    <a href="javascript:void(0)" onClick={()=>onFavorite()}
       className="icon-star-empty3 icon-2x display-block text-muted"></a>
  </div>);
};
export default Favorite;
