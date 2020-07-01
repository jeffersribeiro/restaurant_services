import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
const ShowAlert = ({ variant, message }) => {
  const [show, setShow] = useState(true);
  setTimeout(() => {
    setShow(false);
  }, 5000);
  return (
    <Alert show={show} variant={variant}>
      <p>{message}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          onClick={() => setShow(false)}
          variant="outline-success"
        >
          Close
        </Button>
      </div>
    </Alert>
  );
};

export default ShowAlert;
