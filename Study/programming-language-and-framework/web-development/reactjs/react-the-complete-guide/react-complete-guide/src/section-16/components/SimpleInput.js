import { useState, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredEmailIsValid =
    enteredEmail.trim() !== "" && enteredEmail.includes("@");

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log(enteredName);
    // console.log(nameInputRef.current.value);

    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputTouched = () => {
    setEnteredNameTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputTouched = () => {
    setEnteredEmailTouched(true);
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const nameInputClasses =
    nameInputIsInvalid && emailInputIsInvalid
      ? "form-control invalid"
      : "form-control";

  return (
    <form onSubmit={formSubmissionHandler} className={nameInputClasses}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onBlur={nameInputTouched}
          onChange={nameInputChangeHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onBlur={emailInputTouched}
          onChange={emailInputChangeHandler}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
