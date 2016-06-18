import React, {Component, PropTypes} from 'react';

export default class QuestionsList extends Component {
  static propTypes = {
    questions: PropTypes.object,
  }

  render() {
    return (<div className="content-group tab-content-bordered navbar-component">
      <div className="navbar navbar-default navbar-xs">
        <ul className="nav navbar-nav no-border visible-xs-block">
          <li><a className="text-center collapsed legitRipple" data-toggle="collapse"
                 data-target="#navbar-second-toggle"><i className="icon-circle-down2"></i></a></li>
        </ul>
        <div className="navbar-collapse collapse" id="navbar-second-toggle">
          <div className="navbar-text h3">Top Questions</div>
        </div>
      </div>
      <div className="tab-content">
        <div className="tab-pane fade has-padding active in" id="tab1">
          <ul className="media-list media-list-bordered">
            <li className="media">
              <div className="media-left width-200 pr-5">
                <div className="heading-btn-group">
                  <a href="#" className="btn text-muted text-size-small p-5 pl-10 pr-10 legitRipple">
                    <div className="counts">0</div>
                    <span>votes</span></a>
                  <a href="#" className="btn text-muted text-size-small p-5 pl-10 pr-10 legitRipple">
                    <div className="counts">0</div>
                    <span>answers</span></a>
                  <a href="#" className="btn text-muted text-size-small p-5 pl-10 pr-10 legitRipple">
                    <div className="counts">1</div>
                    <span>views</span></a>
                </div>
              </div>

              <div className="media-body pl-10">
                <h6 className="media-heading mb-5"><a href="#">Webstorm - errors after pub:build</a></h6>
                <div className="content-group no-margin clearfix">
                  <div className="pull-left">
                    <button type="button" className="btn btn-default btn-xs pt-5 pb-5 legitRipple">Tag
                    </button>
                  </div>
                  <div className="pull-right mt-5">
                    <a href="#" className="text-muted">asked 1 min ago</a>
                    <a href="#">Александр Юрьевич Ком</a>
                    1
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <hr/>
          <p className="content-group no-margin">Looking for more? Browse the <a href="#" target="_blank">complete list
            of questions</a>, or <a href="#" target="_blank">popular tags</a>. Help us answer <a href="#">unanswered
            questions</a>.</p>
        </div>
      </div>
    </div>);
  }
}
