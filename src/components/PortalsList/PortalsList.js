import React from 'react';
import RemoveButton from './RemoveButton/RemoveButton';
const MyPortals = ({config, order, portals, onRemove})=> {
  return (<table className="table table-striped">
    <thead>
    <tr>
      <th>#</th>
      <th>Portal</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {order.map((slug, index)=> {
      const portal = portals.get(slug);
      return portal ? ( <tr key={portal.get('slug')}>
        <td>{index + 1}</td>
        <td>
          <a href={`http://${portal.get('slug')}.${config.mainDomain}/`}
             target="_blank">{`http://${portal.get('slug')}.${config.mainDomain}/`}</a>
        </td>
        <td>
          <RemoveButton portal={portal} onRemove={()=> onRemove(portal)}/>
        </td>
      </tr>) : null;
    })}
    </tbody>
  </table>);
};

export default MyPortals;
