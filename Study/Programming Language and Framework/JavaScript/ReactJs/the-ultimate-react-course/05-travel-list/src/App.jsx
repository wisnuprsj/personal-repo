import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);

  const addNewItem = (item) => {
    setItems((prevState) => [...prevState, item]);
  };

  const removeItem = (id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Logo />
      <Form addNewItem={addNewItem} />
      <PackingList items={items} removeItem={removeItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form(props) {
  const [form, setForm] = useState({
    description: "",
    quantity: 1,
    packed: false,
  });

  const onOptionChanged = (event) => {
    setForm((prevState) => {
      return { ...prevState, quantity: +event.target.value };
    });
  };

  const onDescriptionChanged = (event) => {
    setForm((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };

  const onFormSubmitted = (event) => {
    event.preventDefault();
    props.addNewItem({ id: new Date().toISOString(), ...form });
    setForm({
      description: "",
      quantity: 1,
      packed: false,
    });
  };

  return (
    <form className="add-form" onSubmit={onFormSubmitted}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select value={form.quantity} onChange={onOptionChanged}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={form.description}
        onChange={onDescriptionChanged}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, removeItem }) {
  const remove = (id) => {
    removeItem(id);
  };

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <PackingItem key={item.id} {...item} remove={remove} />
        ))}
      </ul>
    </div>
  );
}

function PackingItem({ id, description, quantity, packed, remove }) {
  const removeItem = () => {
    remove(id);
  };

  return (
    <li>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={removeItem}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

export default App;
