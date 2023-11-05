import React, { useState } from "react";

export const Tour = ({ id, name, info, image, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false);

  const readMoreToggle = () => {
    setReadMore(!readMore);
  };

  const description = readMore ? (
    <p>
      {info}{" "}
      <button onClick={readMoreToggle} className="info-btn">
        read less
      </button>
    </p>
  ) : (
    <p>
      {info.substring(0, 200)} ...{" "}
      <button onClick={readMoreToggle} className="info-btn">
        read more
      </button>
    </p>
  );

  return (
    <article className="single-tour">
      <img src={image} alt={name} className="img" />
      <span className="tour-price">${price}</span>
      <div className="tour-info">
        <h5>{name}</h5>
        {description}
        <button
          type="button"
          className="btn btn-block delete-btn"
          onClick={() => removeTour(id)}
        >
          not interested
        </button>
      </div>
    </article>
  );
};
