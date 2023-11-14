import { useState, useReducer } from "react";
import { data } from "../../../data";
import { CLEAR_LIST, REMOVE_ITEM, RESET_LIST } from "./action";
import reducer from "./reducer";

const initialValue = {
  people: data,
};

const ReducerBasics = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const [people, setPeople] = useState(data);

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, id });
  };

  const clearList = () => {
    dispatch({ type: CLEAR_LIST });
  };

  const resetList = () => {
    dispatch({ type: RESET_LIST });
  };

  return (
    <div>
      {state.people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}

      {state.people.length < 1 ? (
        <button
          className="btn"
          style={{ marginTop: "2rem" }}
          onClick={resetList}
        >
          reset
        </button>
      ) : (
        <button
          className="btn"
          style={{ marginTop: "2rem" }}
          onClick={clearList}
        >
          clear
        </button>
      )}
    </div>
  );
};

export default ReducerBasics;
