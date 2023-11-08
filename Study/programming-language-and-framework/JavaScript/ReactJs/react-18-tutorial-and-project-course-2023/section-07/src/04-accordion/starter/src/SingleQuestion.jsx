import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const SingleQuestion = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <article className="question">
      <header>
        <h5>{title}</h5>
        <button
          type="button"
          className="btn question-btn"
          onClick={toggleShowInfo}
        >
          {!showInfo ? <AiOutlinePlus /> : <AiOutlineMinus />}
        </button>
      </header>
      {showInfo && <p>{info}</p>}
    </article>
  );
};
