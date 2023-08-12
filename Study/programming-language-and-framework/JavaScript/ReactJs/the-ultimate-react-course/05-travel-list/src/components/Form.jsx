import { useState } from "react";

export default function Form(props) {
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
    if (!form.description) return;
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
