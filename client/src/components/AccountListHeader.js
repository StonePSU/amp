import React from "react";
import "./AccountListHeader.css";

const AccountListHeader = ({ type }) => {
  return (
    <div className="list-header">
      {type === "KAD" ? (
        <React.Fragment>
          <div className="list-header-item">KAD#</div>
        </React.Fragment>
      ) : null}
      <React.Fragment>
        <div className="list-header-item">{type} Name</div>
        <div className="list-header-item">Street Address</div>
        <div className="list-header-item">City</div>
        <div className="list-header-item">State</div>
        <div className="list-header-item">Zip Code</div>
      </React.Fragment>
    </div>
  );
};

export default AccountListHeader;
