import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const ButtonTint = ({ className, divClassName, text = "Request Physical Card" }) => {
  return (
    <div className={`button-tint ${className}`}>
      <div className={`request-physical ${divClassName}`}>{text}</div>
    </div>
  );
};

ButtonTint.propTypes = {
  text: PropTypes.string,
};
export default ButtonTint