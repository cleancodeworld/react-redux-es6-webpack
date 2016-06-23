import React from 'react';
import moment from 'moment';

const AuthorCardQAndA = ({author, createdAt})=> {
  return (<blockquote className="no-margin no-padding-top">
      <header className="mb-5">{moment(createdAt).fromNow()}</header>
      <img src={author.get('image')} width="40" height="40" alt="" className="mr-10"/>
      <a href="#">{author.get('username')}</a>
      <div className="content-group no-margin">[-] &nbsp;<span className="status-mark bg-danger"></span> [-]</div>
    </blockquote>
  );
};

export default AuthorCardQAndA;
