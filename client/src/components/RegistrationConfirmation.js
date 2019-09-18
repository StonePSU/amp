import React from "react";
import PageTitle from "./PageTitle";

function RegistrationConfirmation({ heading, text }) {
  return (
    <React.Fragment>
      <PageTitle>Registration Complete!</PageTitle>
      <p className="page-instruction">
        You have successfully completed your registration for the Asset
        Management Portal!
      </p>
    </React.Fragment>
  );
}

export default RegistrationConfirmation;
