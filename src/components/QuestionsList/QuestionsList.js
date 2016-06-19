import React, {Component, PropTypes} from 'react';
import QuestionItem from './Item/Item';

export default class QuestionsList extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.array,
  }

  render() {
    const {order, entities} = this.props;
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
            {order.map(key=> {
              return (<QuestionItem question={entities.get(key)}/>);
            })}

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
