import { useState } from "react";

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: "peter",
    age: 24,
    hobby: "Basketball",
  });
  // const [name, setName] = useState("peter");
  // const [age, setAge] = useState(24);
  // const [hobby, setHobby] = useState("Basketball");

  const displayPerson = () => {
    // setName("John");
    // setAge(32);
    // setHobby("scream at the computer");
    setPerson({
      name: "john",
      age: 21,
      hobby: "Scream at the computer",
    });
  };

  return (
    <h2>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h4>Enjoy : {person.hobby}</h4>
      <button className="btn" onClick={displayPerson}>
        show john
      </button>
    </h2>
  );
};

export default UseStateObject;
