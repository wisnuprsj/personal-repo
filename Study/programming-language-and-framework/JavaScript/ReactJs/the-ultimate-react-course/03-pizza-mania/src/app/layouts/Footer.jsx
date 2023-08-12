import React from "react";

export const Footer = ({ isOpen, openHour, closeHour }) => {
  //   if (!isOpen) return <p>CLOSED</p>;

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>We're open until {closeHour}:00. Come visit us or order online</p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 abd {closeHour}:00.
        </p>
      )}
    </footer>
  );
};
