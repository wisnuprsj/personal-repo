import { useState } from "react";

const UseStateBasics = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prevValue) => prevValue + 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button type="button" onClick={handleIncrease}>
        Increase
      </button>
    </div>
  );
};

export default UseStateBasics;
