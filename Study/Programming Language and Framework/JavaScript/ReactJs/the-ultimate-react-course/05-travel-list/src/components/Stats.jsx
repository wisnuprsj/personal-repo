export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  const countItems = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  const countPacked = items
    .filter((item) => item.packed)
    .reduce((acc, curVal) => acc + curVal.quantity, 0);

  const percentage = Math.round((countPacked / countItems) * 100);

  if (percentage === 100)
    return (
      <footer className="stats">
        <em>You got everything! Ready to go ✈️</em>
      </footer>
    );

  return (
    <footer className="stats">
      <em>
        💼 You have {countItems} items on your list, and you already packed{" "}
        {countPacked} ({percentage})%
      </em>
    </footer>
  );
}
