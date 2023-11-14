import { useState } from "react";
import people from "./data";

import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const App = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  const nextPerson = () => {
    setIndex((currIndex) => {
      return (currIndex + 1) % people.length;
    });
  };

  const prevPerson = () => {
    setIndex((currIndex) => {
      return (currIndex - 1 + people.length) % people.length;
    });
  };

  const randomPerson = () => {
    let randomIndex = Math.floor(people.length * Math.random());
    while (randomIndex === index) {
      randomIndex = Math.floor(people.length * Math.random());
    }
    setIndex(randomIndex);
  };

  return (
    <main>
      <article className="review">
        <div className="img-container">
          <img src={image} alt={name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="author">{name}</h4>
        <p className="job">{job}</p>
        <p className="info">{text}</p>
        <div className="btn-container">
          <button type="button" className="prev-btn" onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button type="button" className="next-btn" onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
        <button className="btn btn-hipster" onClick={randomPerson}>
          suprise me
        </button>
      </article>
    </main>
  );
};
export default App;
