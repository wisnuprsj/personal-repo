import { useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

const initialItems = [
  // { id: 1, description: "Passports", quantity: 2, packed: true },
  // { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);

  const addNewItem = (item) => {
    setItems((prevState) => [...prevState, item]);
  };

  const removeItem = (id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  const crossMarkItem = (id) => {
    setItems((prevState) => {
      return prevState.map((item) => {
        return item.id === id ? { ...item, packed: true } : item;
      });
    });
  };

  const handleClearList = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?"
    );

    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form addNewItem={addNewItem} />
      <PackingList
        items={items}
        removeItem={removeItem}
        crossItem={crossMarkItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
