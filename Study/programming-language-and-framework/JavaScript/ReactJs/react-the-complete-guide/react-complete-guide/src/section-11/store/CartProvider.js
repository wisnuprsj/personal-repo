import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id;
      });
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItem;
      let updatedItems;

      if (existingCartItem) {
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItem = { ...action.item };
        updatedItems = state.items.concat(updatedItem);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    case "REMOVE":
      const existCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.id;
      });
      const existingItem = state.items[existCartItemIndex];
      const updateTotalAmount = state.totalAmount - existingItem.price;
      let newItems;
      if (existingItem.amount === 1) {
        newItems = state.items.filter((item) => item.id !== action.id);
      } else {
        updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        newItems = [...state.items];
        newItems[existCartItemIndex] = updatedItem;
      }
      return { ...state, items: newItems, totalAmount: updateTotalAmount };
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
