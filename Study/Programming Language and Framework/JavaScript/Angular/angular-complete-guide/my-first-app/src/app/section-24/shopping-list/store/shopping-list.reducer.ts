import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.Actions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      const addActions = <ShoppingListActions.AddIngredient>action;
      return {
        ...state,
        ingredients: [...state.ingredients, addActions.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      const addsActions = <ShoppingListActions.AddIngredients>action;
      return {
        ...state,
        ingredients: [...state.ingredients, ...addsActions.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const updateActions = <ShoppingListActions.UpdateIngredient>action;
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...updateActions.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.START_EDIT:
      const startActions = <ShoppingListActions.StartEdit>action;

      return {
        ...state,
        editedIngredientIndex: startActions.payload,
        editedIngredient: { ...state.ingredients[startActions.payload] },
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
}
