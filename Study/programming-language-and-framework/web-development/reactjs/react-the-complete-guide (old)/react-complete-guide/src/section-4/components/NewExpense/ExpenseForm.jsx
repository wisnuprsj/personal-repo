import React, { useState } from "react";

import "./ExpenseForm.css";

function ExpenseForm(props) {
  //   const [title, setTitle] = useState("");
  //   const [amount, setAmount] = useState("");
  //   const [date, setDate] = useState("");
  const [formState, setFormState] = useState({
    title: "",
    amount: "",
    date: "",
  });

  const titleChangeHandler = (e) => {
    setFormState((prevState) => {
      return { ...prevState, title: e.target.value };
    });
  };

  const amountChangeHandler = (e) => {
    setFormState((prevState) => {
      return { ...prevState, amount: e.target.value };
    });
  };

  const dateChangeHandler = (e) => {
    setFormState((prevState) => {
      return { ...prevState, date: e.target.value };
    });
  };

  const newExpenseSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      ...formState,
      date: new Date(formState.date),
    };
    setFormState({
      title: "",
      amount: "",
      date: "",
    });
    props.onSaveExpenseData(expenseData);
  };

  return (
    <form onSubmit={newExpenseSubmit}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={formState.title}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={formState.amount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={formState.date}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
