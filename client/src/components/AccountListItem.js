import React from "react";
import "./AccountListItem.css";

const AccountListItem = props => {
  const type = props.type;
  return (
    <div className="list-row" onClick={() => props.onClick(props._id)}>
      {type === "KAD" ? (
        <div className="list-row-item">{props.kadNumber}</div>
      ) : null}
      <div className="list-row-item">{props.accountName}</div>
      <div className="list-row-item">{props.address.addressLine1}</div>
      <div className="list-row-item">{props.address.city}</div>
      <div className="list-row-item">{props.address.state}</div>
      <div className="list-row-item">{props.address.postalCode}</div>
    </div>
  );
};

export default AccountListItem;
