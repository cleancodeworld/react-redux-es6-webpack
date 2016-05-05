import React, {Component} from 'react';

export default class ProfileCover extends Component {
  render() {
    return (
      <div className="profile-cover">
        <div className="profile-cover-img" style={{backgroundImage: 'url(https://udemy-images.udemy.com/course/750x422/129118_fab9_7.jpg)'}}></div>
        <div className="media">
          <div className="media-left">
            <a href="#" className="profile-thumb">
              <img src="https://pbs.twimg.com/profile_images/1868773314/image.jpg" className="img-circle" alt="" />
            </a>
          </div>
          <div className="media-body">
              <h1>John Curtis <small className="display-block">CEO Curtis Digital, Inc.</small></h1>
          </div>
          <div className="media-right media-middle">
            <ul className="list-inline list-inline-condensed no-margin-bottom text-nowrap">
              <li><a href="#" className="btn btn-default"><i className="icon-file-picture position-left"></i> Cover image</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
