import React from "react";
import ExpenseItem from "./ExpenseItem";

import "./ExpensesList.css";

export const ExpensesList = ({ expenses }) => {
  let expensesContent = <p>No expenses found.</p>;

  if (expenses.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  if (expenses.length > 0) {
    expensesContent = expenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ));
  }

  return <ul className="expenses-list">{expensesContent}</ul>;
};
