import React from "react";
import Pizza from "../components/Pizza";

export const Menu = () => {
  return (
    <main className="menu">
      <h2>Our menu</h2>

      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious.
      </p>

      <Pizza />
    </main>
  );
};
