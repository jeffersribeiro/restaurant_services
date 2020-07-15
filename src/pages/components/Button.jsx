import React from "react";
import Button from "@material-ui/core/Button";
import proptypes from "prop-types";

export default function MatButton({
  className,
  href,
  color,
  text,
  variant,
  type,
}) {
  return (
    <Button
      className={className}
      href={href}
      type={type}
      variant={variant}
      color={color}
    >
      {text}
    </Button>
  );
}

MatButton.prototype = {
  color: proptypes.string.isRequired,
  className: proptypes.string.isRequired,
  href: proptypes.string.isRequired,
  type: proptypes.string.isRequired,
  text: proptypes.string.isRequired,
  variant: proptypes.string.isRequired,
};
