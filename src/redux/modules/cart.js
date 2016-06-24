export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const ADD_TO_CART = 'knexpert/cart/ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'knexpert/cart/ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAIL = 'knexpert/cart/ADD_TO_CART_FAIL';
export const REMOVE_FROM_CART = 'knexpert/cart/REMOVE_FROM_CART';
export const REMOVE_FROM_CART_SUCCESS = 'knexpert/cart/REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_FAIL = 'knexpert/cart/REMOVE_FROM_CART_FAIL';
export const LOAD_MY_CART = 'knexpert/cart/LOAD_MY_CART';
export const LOAD_MY_CART_SUCCESS = 'knexpert/cart/LOAD_MY_CART_SUCCESS';
export const LOAD_MY_CART_FAIL = 'knexpert/cart/LOAD_MY_CART_FAIL';
export const CART_STRIPE_CHARGE = 'knexpert/cart/STRIPE_CHARGE';
export const CART_STRIPE_CHARGE_SUCCESS = 'knexpert/cart/STRIPE_CHARGE_SUCCESS';
export const CART_STRIPE_CHARGE_FAIL = 'knexpert/cart/STRIPE_CHARGE_FAIL';

import Immutable from 'immutable';

import { LOGOUT_SUCCESS } from './auth';

const initialState = Immutable.fromJS({
  isLoaded: false,
  order: [],
  entities: {}
});

export default function cart(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case ADD_TO_CART:
      return state.withMutations(map=> {
        const {courseName} = action.data;
        map.update('order', array=>array.push(courseName));
        map.setIn(['entities', courseName], true);
      });
    case REMOVE_FROM_CART:
      return state.withMutations(map=> {
        const {courseName} = action.data;
        map.removeIn(['entities', courseName]);
        map.update('order', array=>array.filter((item)=> item !== courseName));
      });
    case LOAD_MY_CART_SUCCESS:
      return state.withMutations(map=> {
        const {userCartItems} = action.result.data;
        userCartItems.map((item)=> {
          map.setIn(['entities', item.course.slug], true);
          map.update('order', array=>array.push(item.course.slug));
        });
        map.set('isLoaded', true);
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export function removeFromCart(course) {
  return {
    types: [REMOVE_FROM_CART, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL],
    promise: (client) => client.del(`/api/v1/cart/${course.get('slug')}`),
    data: {
      courseName: course.get('slug')
    }
  };
}

export function addToCart(course) {
  return {
    types: [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
    promise: (client) => client.post(`/api/v1/cart`, { data: { courseId: course.get('id') } }),
    data: {
      courseName: course.get('slug')
    }
  };
}

export function load() {
  return {
    types: [LOAD_MY_CART, LOAD_MY_CART_SUCCESS, LOAD_MY_CART_FAIL],
    promise: (client) => client.get(`/api/v1/cart?includeCourse=true`),
  };
}

export function isLoaded(globalState) {
  return globalState.cart && globalState.cart.get('isLoaded');
}

function stripeChargeCart(amount, currency, stripeToken) {
  return {
    types: [CART_STRIPE_CHARGE, CART_STRIPE_CHARGE_SUCCESS, CART_STRIPE_CHARGE_FAIL],
    promise: (client) => client.post(`/stripe/charge`, {
      data: {
        stripeToken,
        amount: amount * 100,
        currency: currency
      }
    })
  };
}

export function checkout(amount, currency, tokenId) {
  return dispatch => {
    dispatch(stripeChargeCart(amount, currency, tokenId))
      .catch(err=> {
        alert(JSON.stringify(err, null, 4));
      });
  };
}
