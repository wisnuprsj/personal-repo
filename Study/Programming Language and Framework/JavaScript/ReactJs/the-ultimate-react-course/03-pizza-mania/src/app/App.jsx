import React from "react";
import Header from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { Menu } from "./layouts/Menu";

const App = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <div className="container">
      {/* <h1>Hello React !</h1> */}
      <Header />
      <Menu />
      <Footer openHour={openHour} closeHour={closeHour} isOpen={isOpen} />
    </div>
  );
};

export default App;
