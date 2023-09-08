import { createReducer, on, State } from '@ngrx/store';
import { decrement, increment } from './counter.action';
import { state } from '@angular/animations';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value)
);

// export const counterReducer = (state = initialState) => {
//   return state;
// };
