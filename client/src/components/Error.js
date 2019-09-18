import React from "react";

function FieldError({ errorText }) {
  if (errorText) {
    return <div className="field-error small">{errorText}</div>;
  } else {
    return "";
  }
}

export { FieldError };
