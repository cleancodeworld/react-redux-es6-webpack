import React from 'react';
import { Link } from 'react-router';
import config from '../../config';

const UserNav = ({loggedIn = false, logout, portal}) => {
  let res;
  if (loggedIn) {
    res = (<ul className="nav navbar-nav pull-right">
      <li className="nav-item">
        <Link to="/user-profile">Update phone</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={()=>logout()} href="javascript:void(0)">Logout</a>
      </li>
    </ul>);
  } else {
    res = (<ul className="nav navbar-nav pull-right">
      <li className="nav-item dropdown">
        {portal
          ? <a className="nav-link active" href={`//${config.mainDomain()}/login`}>Login</a>
          : <Link className="nav-link active" to="/login">Login</Link>
        }
      </li>
    </ul>);
  }
  return res;
};

UserNav.propTypes = {};

export default UserNav;
