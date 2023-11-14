import React from "react";
import { pizzaData } from "../../data/data";
import PizzaItem from "./PizzaItem";

const Pizza = () => {
  return (
    <ul className="pizzas">
      {pizzaData.map((pizza, index) => {
        return <PizzaItem key={index} {...pizza} />;
      })}
    </ul>
  );
};

export default Pizza;
