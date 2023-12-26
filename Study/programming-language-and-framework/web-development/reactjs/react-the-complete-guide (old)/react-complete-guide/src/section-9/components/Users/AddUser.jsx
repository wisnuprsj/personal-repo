import React, { Fragment, useState, useRef } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState(0);
  const [error, setError] = useState(null);

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(+event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    const username = nameInputRef.current.value;
    const age = +ageInputRef.current.value;
    console.log(username, age);
    if (enteredUsername.trim().length === 0 || enteredAge === 0) {
      setError({
        title: "Invalid Value",
        message: "Please enter a valid value",
      });
      return;
    }
    if (enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredAge(0);
    setEnteredUsername("");
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          close={clearError}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            name="age"
            id="age"
            value={enteredAge}
            onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
