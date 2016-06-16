export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  entities: {}
});

export default function loaded(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    default:
      return state;
  }
}
