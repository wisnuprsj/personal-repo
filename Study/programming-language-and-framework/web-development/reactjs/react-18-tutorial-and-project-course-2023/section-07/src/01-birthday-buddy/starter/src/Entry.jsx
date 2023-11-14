import { useState } from "react";
import data from "./data";
import List from "./List";

const Entry = () => {
  const [people, setPeople] = useState(data);

  const clearList = () => {
    setPeople([]);
  };

  const resetList = () => {
    setPeople(data);
  };

  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        <List people={people} />
        <button className="btn btn-block" onClick={clearList}>
          Clear
        </button>
        <button className="btn btn-block" onClick={resetList}>
          Reset
        </button>
      </section>
    </main>
  );
};

export default Entry;
