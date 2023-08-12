import { useState, useEffect } from "react";

import Card from "./Card";
import useCounter from "../hooks/use-counter";

const BackwardCounter = () => {
  // const [counter, setCounter] = useState(0);
  const counter = useCounter(false);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;