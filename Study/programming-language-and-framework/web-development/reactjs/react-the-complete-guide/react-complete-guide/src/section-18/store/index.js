// import { createStore, combineReducers } from "redux";

// const counterReducer = (state = initialState, action) => {
//   if (action.type === INCREMENT) {
//     return {
//       ...state,
//       counter: state.counter + 1,
//     };
//   }

//   if (action.type === INCREASE) {
//     return {
//       ...state,
//       counter: state.counter + action.amount,
//     };
//   }

//   if (action.type === DECREMENT) {
//     return {
//       ...state,
//       counter: state.counter - 1,
//     };
//   }

//   if (action.type === TOGGLE) {
//     return {
//       ...state,
//       showCounter: !state.showCounter,
//     };
//   }

//   return state;
// };

// const reducers = combineReducers({
//   counter: counterReducer,
// });

// const store = createStore(reducers);

import {
  actions as counterActions,
  reducers as counterReducers,
} from "./counter";
import { actions as authActions, reducers as authReducers } from "./auth";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    counter: counterReducers,
    auth: authReducers,
  },
});

const actions = {
  counterActions,
  authActions,
};

export { store, actions };
