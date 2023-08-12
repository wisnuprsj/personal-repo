// import { Component } from "react";
// import {connect} from 'react-redux'

import { useSelector, useDispatch } from "react-redux";
// import { INCREMENT, DECREMENT, INCREASE, TOGGLE } from "../store";
import { actions } from "../store/index";
import classes from "./Counter.module.css";

const Counter = () => {
  const counterState = useSelector((state) => state.counter);
  const counterDispatch = useDispatch();

  const incrementHandler = () => {
    // counterDispatch({ type: INCREMENT });
    counterDispatch(actions.counterActions.increment());
  };

  const increaseByFiveHandler = () => {
    // counterDispatch({ type: INCREASE, amount: 5 });
    counterDispatch(actions.counterActions.increase(5)); // will be converted to {type: "increase", payload: 5} payload key always
  };
  const decrementHandler = () => {
    // counterDispatch({ type: DECREMENT });
    counterDispatch(actions.counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    // counterDispatch({ type: TOGGLE });
    counterDispatch(actions.counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {counterState.showCounter && (
        <div className={classes.value}>{counterState.counter}</div>
      )}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseByFiveHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }
//   decrementHandler() {
//     this.props.decrement();
//   }
//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.incrementHandler.bind(this)}>
//             Increase by 5
//           </button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler.bind(this)}>
//           Toggle Counter
//         </button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "increment" }),
//     decrement: () => dispatch({ type: "decrement" }),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
