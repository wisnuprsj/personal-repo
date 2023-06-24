import React from "react";

const Header = () => {
  //   const h1Style = { color: "red", fontSize: "32px" };
  //   return <h1 style={h1Style}>Fast React Pizza Co.</h1>;
  const h1Style = {};
  return (
    <header className="header">
      <h1 style={h1Style}>Fast React Pizza Co.</h1>;
    </header>
  );
};

export default Header;
