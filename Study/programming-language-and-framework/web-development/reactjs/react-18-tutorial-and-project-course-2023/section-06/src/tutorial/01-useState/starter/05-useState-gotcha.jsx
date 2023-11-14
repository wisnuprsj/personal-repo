import { useState } from "react";

const UseStateGotcha = () => {
  const [value, setValue] = useState(0);

  const handleClick = () => {
    // setValue((prevValue) => prevValue + 1);
    // console.log(value);

    setTimeout(() => {
      setValue((prevValue) => prevValue + 1);
    }, 3000);
  };

  return (
    <div>
      <h1>{value}</h1>
      <button type="button" className="btn" onClick={handleClick}>
        increase
      </button>
    </div>
  );
};

export default UseStateGotcha;
