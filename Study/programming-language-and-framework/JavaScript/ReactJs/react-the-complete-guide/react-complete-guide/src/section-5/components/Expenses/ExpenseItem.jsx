import "./ExpenseItem.css";
import { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI//Card";

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);

  const onChangeTitle = () => {
    setTitle("Updated");
  };

  return (
    <Card className="expense-item">
      {/* <div className="">{props.date.toISOString()}</div> */}
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={onChangeTitle}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;
