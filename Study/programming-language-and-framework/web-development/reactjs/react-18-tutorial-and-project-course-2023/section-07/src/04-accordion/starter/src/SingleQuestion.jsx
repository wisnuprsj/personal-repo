import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const SingleQuestion = ({
  id,
  title,
  info,
  showInfoId,
  toggleShowInfo,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleShow = () => {
    // setShowInfo(!showInfo);
    toggleShowInfo(id);
  };

  return (
    <article className="question">
      <header>
        <h5>{title}</h5>
        <button type="button" className="btn question-btn" onClick={toggleShow}>
          {!(showInfoId === id) ? <AiOutlinePlus /> : <AiOutlineMinus />}
        </button>
      </header>
      {showInfoId === id && <p>{info}</p>}
    </article>
  );
};
