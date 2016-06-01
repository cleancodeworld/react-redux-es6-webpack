import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';

const style = {
};

const cardTarget = {
  drop() {
  }
};

@DragDropContext(HTML5Backend) // eslint-disable-line new-cap
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({ // eslint-disable-line new-cap
  connectDropTarget: connect.dropTarget()
}))
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: 'Write a cool JS library',
        editMode: false,
      }, {
        id: 2,
        text: 'Make it generic enough',
        editMode: false,
      }]
    };
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
        ]
      }
    }));
  }

  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(crt => crt.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  updateCard(card) {
    const cards = this.state.cards.map(item=> item.id === card.id ? card : item);
    this.setState({ cards });
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards } = this.state;

    return connectDropTarget(
      <div style={style}>
        {cards.map(card => {
          return (
            <Card key={card.id}
                  id={card.id}
                  card={card}
                  moveCard={this.moveCard}
                  findCard={this.findCard}
                  updateCard={this.updateCard}
            />
          );
        })}
        <a href="javscript:void(0)"
           onClick={()=> this.setState({cards: [...this.state.cards, {id: Math.random(), text: 'Nour Sammour'}]})}>Add Text Editor</a>
      </div>
    );
  }
}
