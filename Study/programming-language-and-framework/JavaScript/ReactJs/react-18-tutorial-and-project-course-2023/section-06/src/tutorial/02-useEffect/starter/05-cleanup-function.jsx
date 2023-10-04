import { useState } from "react";
import { useEffect } from "react";

const CleanupFunction = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button className="btn" onClick={() => setToggle(!toggle)}>
        toggle component
      </button>
      {toggle && <RandomComponent />}
    </div>
  );
};

const RandomComponent = () => {
  useEffect(() => {
    // console.log("hmm, this is interesting");
    // const intId = setInterval(() => {
    //   console.log("hello from interval");
    // }, 1000);
    // return () => {
    //   clearInterval(intId);
    //   console.log("cleaning up ...");
    // };

    const someFunc = () => {
      // some login
    };
    window.addEventListener("scroll", someFunc);
    return () => window.removeEventListener("scroll", someFunc);
  }, []);

  return <h1>hello there</h1>;
};

export default CleanupFunction;
