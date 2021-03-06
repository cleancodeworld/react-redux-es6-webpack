import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import { addToCart as add, removeFromCart as remove, checkout as checkoutCart } from 'redux/modules/cart';

@connect(
  ({cart}) => ({
    cartEntities: cart.get('entities'),
    cartOrder: cart.get('order'),
  }),
  { addToCart: add, removeFromCart: remove, checkout: checkoutCart }
)
export default function withCart(WrappedComponent) {
  class WithCart extends Component {
    static propTypes = {
      cartEntities: PropTypes.object,
      cartOrder: PropTypes.object,
      addToCart: PropTypes.func,
      removeFromCart: PropTypes.func,
      checkout: PropTypes.func,
    }

    render() {
      const {cartEntities, cartOrder, addToCart, removeFromCart, checkout, ...otherProps} = this.props;
      return (<WrappedComponent { ...otherProps }
        cart={{entities: cartEntities, order: cartOrder, addToCart, removeFromCart, checkout}}/>);
    }
  }
  return hoistStatics(WithCart, WrappedComponent);
}
