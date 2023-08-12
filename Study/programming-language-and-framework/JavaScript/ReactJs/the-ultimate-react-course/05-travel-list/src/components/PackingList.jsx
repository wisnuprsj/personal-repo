import { useState } from "react";
import PackingItem from "./PackingItem";

export default function PackingList({
  items,
  removeItem,
  crossItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  const remove = (id) => {
    removeItem(id);
  };

  let sortedItems = [];

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <PackingItem
            key={item.id}
            {...item}
            remove={remove}
            crossMarkItem={crossItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button
          onClick={onClearList}
          disabled={items.length === 0}
          className={`${items.length === 0 ? "disabled" : ""}`}
        >
          Clear list
        </button>
      </div>
    </div>
  );
}
