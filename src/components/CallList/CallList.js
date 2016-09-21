import React, { Component, PropTypes } from 'react';
import { CallListItem } from 'components';

export default class CallList extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    portal: PropTypes.object,
    user: PropTypes.object,
  };

  render() {
    const { entities, order, portal, user} = this.props;
    return order.count() ? (
      <div>
        <ul className="media-list search-results-list content-group">
          {
            order.map(callId => {
              const call = entities.get(callId);
              return (<CallListItem key={call.get('id')} user={user} portal={portal} call={call}/>);
            })
          }
        </ul>
      </div>
    ) : (<span/> );
  }
}
