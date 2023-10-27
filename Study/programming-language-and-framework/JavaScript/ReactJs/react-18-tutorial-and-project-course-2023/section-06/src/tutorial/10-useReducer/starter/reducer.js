import { data } from "../../../data";
import { CLEAR_LIST, REMOVE_ITEM, RESET_LIST } from "./action";

const reducer = (state, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      let newPeople = [...state.people].filter(
        (person) => person.id !== action.id
      );
      return { ...state, people: newPeople };
    case RESET_LIST:
      return { ...state, people: data };
    case CLEAR_LIST:
      return { ...state, people: [] };
    default:
      console.error(`No matching for the ${action.type} - action`);
      return state;
  }
};

export default reducer;
