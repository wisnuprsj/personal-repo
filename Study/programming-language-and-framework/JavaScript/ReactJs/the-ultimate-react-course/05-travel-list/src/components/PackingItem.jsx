export default function PackingItem({
  id,
  description,
  quantity,
  packed,
  remove,
  crossMarkItem,
}) {
  const removeItem = () => {
    remove(id);
  };

  const onCheckItem = () => {
    crossMarkItem(id);
  };

  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onChange={onCheckItem}
        checked={packed}
      />
      <span
        style={packed ? { textDecoration: "line-through" } : {}}
        onClick={onCheckItem}
      >
        {quantity} {description}
      </span>
      <button onClick={removeItem}>❌</button>
    </li>
  );
}
