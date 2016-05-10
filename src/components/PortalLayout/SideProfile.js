import React, {Component, PropTypes} from 'react';

export default class SideProfile extends Component {

  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onMenuToggle = this.onMenuToggle.bind(this);
  }

  state = {
    opened: false,
  };

  onMenuToggle(ev) {
    ev.preventDefault();
    this.setState({ opened: !this.state.opened });
  }

  render() {
    const {name} = this.props;
    const {opened} = this.state;
    return (
      <div className="sidebar-category sidebar-category-visible">
        <div className="sidebar-user-material">
          <div className="category-content">
            <div className="sidebar-user-material-content">
              <a href="#"><img src=" http://placehold.it/150x150" className="img-circle img-responsive" alt="" /></a>
              <h6>{name}</h6>
            </div>
            <div className="sidebar-user-material-menu">
              <a href="#" data-toggle="collapse" onClick={this.onMenuToggle}><span>My account</span> <i className="caret"></i></a>
            </div>
          </div>
          <div className={'navigation-wrapper collapse' + (opened ? ' in' : '')} id="user-nav">
            <ul className="navigation">
              <li><a href="#"><i className="icon-user-plus"></i> <span>My profile</span></a></li>
              <li><a href="#"><i className="icon-coins"></i> <span>My balance</span></a></li>
              <li><a href="#"><i className="icon-comment-discussion"></i> <span><span className="badge bg-teal-400 pull-right">58</span> Messages</span></a></li>
              <li className="divider"></li>
              <li><a href="#"><i className="icon-cog5"></i> <span>Account settings</span></a></li>
              <li><a href="#"><i className="icon-switch2"></i> <span>Logout</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
