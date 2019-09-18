import React from "react";

export function SubmitButton({ buttonText }) {
  return (
    <button type="submit" className="btn btn-orange">
      {buttonText}
    </button>
  );
}

export function Button({ buttonText }) {
  return (
    <button type="button" className="btn">
      {buttonText}
    </button>
  );
}

export function ButtonOutlined({ buttonText }) {
  return (
    <button type="button" className="btn btn-orange-outline">
      {buttonText}
    </button>
  );
}
