import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import TextEditor from './../TextEditor/TextEditor';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
  marginTop: '.5rem',
  boxShadow: 'none'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({ // eslint-disable-line new-cap
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({ // eslint-disable-line new-cap
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    card: PropTypes.object,
    moveCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired
  };

  render() {
    const { card, updateCard, isDragging, connectDragSource, connectDropTarget, connectDragPreview } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragPreview(connectDropTarget(
      <div className="panel panel" style={{ ...style, opacity }}>
        <div className="panel-heading">
          <div className="heading-elements">
            <ul className="icons-list">
              <li>{connectDragSource(<a className="btn" href="javascript:void(0)"><i style={{cursor: 'move'}}
                                                                                     className="fa fa-arrows"/>Sort
              </a>)}</li>

            </ul>
          </div>
        </div>
        <div className="panel-body">
          {card.editMode ?
            <form className="form-horizontal">
              <div className="form-group">
                <TextEditor value={card.text} onChange={(value)=> updateCard({...card, text: value})}/>
              </div>
              <div className="text-right">
                <a href="javascript:void(0)" className="btn btn-primary"
                   onClick={()=> updateCard({...card, editMode: false})}>Save</a>
              </div>
            </form> :
            <div onDoubleClick={()=> updateCard({...card, editMode: true})}
                 dangerouslySetInnerHTML={(()=>({__html: card.text}))()}></div>}
        </div>
      </div>
    ));
  }
}
