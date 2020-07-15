import React from "react";
import TextField from "@material-ui/core/TextField";
import proptypes from "prop-types";

export default function MatInput({ label }) {
  return <TextField id="standard-basic" label={label} />;
}

MatInput.prototype = {
  label: proptypes.string.isRequired,
};
