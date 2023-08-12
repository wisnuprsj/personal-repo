import React, { Fragment } from "react";

import Card from "./Card";
import Button from "./Button";

import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  const closeModal = () => {
    props.close();
  };

  return (
    <Fragment>
      <div className={classes.backdrop} onClick={closeModal}>
        <Card className={classes.modal}>
          <header className={classes.header}>
            <h2>{props.title}</h2>
          </header>
          <div className={classes.content}>
            <p>{props.message}</p>
          </div>
          <footer className={classes.actions}>
            <Button onClick={closeModal}>Close</Button>
          </footer>
        </Card>
      </div>
    </Fragment>
  );
};

export default ErrorModal;
