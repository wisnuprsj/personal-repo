export default function TabButton({ children, onSelect, isSelected }) {
  return (
    <li>
      <button onClick={onSelect} className={isSelected ? "active" : ""}>
        {children}
      </button>
    </li>
  );
}
