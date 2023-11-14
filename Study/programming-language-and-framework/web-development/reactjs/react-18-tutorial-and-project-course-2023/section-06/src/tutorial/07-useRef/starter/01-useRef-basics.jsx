import { useEffect, useRef, useState } from "react";

const UseRefBasics = () => {
  const [value, setValue] = useState(0);
  const nameInputRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    console.log(isMounted);
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    console.log("re-render");
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    console.log(name);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            ref={nameInputRef}
          />
        </div>
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
      <h1>value : {value}</h1>
      <button onClick={() => setValue(value + 1)} className="btn">
        increase
      </button>
    </div>
  );
};

export default UseRefBasics;
