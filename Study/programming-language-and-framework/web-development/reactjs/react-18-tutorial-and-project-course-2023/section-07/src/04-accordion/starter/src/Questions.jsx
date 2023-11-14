import React, { useState } from "react";
import { SingleQuestion } from "./SingleQuestion";

export const Questions = ({ questions }) => {
  const [showInfoId, setShowInfoId] = useState("");

  const toggleOneInfo = (id) => {
    setShowInfoId(id === showInfoId ? "" : id);
  };

  return (
    <section className="container">
      <h1>Questions</h1>
      {questions.map((question) => {
        return (
          <SingleQuestion
            key={question.id}
            {...question}
            showInfoId={showInfoId}
            toggleShowInfo={toggleOneInfo}
          />
        );
      })}
    </section>
  );
};
