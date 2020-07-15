import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import protypes from "prop-types";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MyAlert({ open, severity, message, onClose }) {
  
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

MyAlert.prototype = {
  open: protypes.bool.isRequired,
  severity: protypes.string.isRequired,
  message: protypes.string.isRequired,
  onClose: protypes.func.isRequired,
};
