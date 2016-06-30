import React from 'react';
const ErrorPage = ({children})=> {
  return (<div className="page-container">
    <div className="page-content">
      <div className="content-wrapper">
        <div className="content">
          <div className="text-center content-group">
            <h5>{children}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default ErrorPage;
