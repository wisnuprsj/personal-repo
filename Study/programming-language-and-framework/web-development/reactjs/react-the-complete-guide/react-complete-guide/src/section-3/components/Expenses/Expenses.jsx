import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses(props) {
  const { expenses } = props;

  return (
    <div className="expenses">
      {expenses.map((expense) => {
        return (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        );
      })}
    </div>
  );
}

export default Expenses;
