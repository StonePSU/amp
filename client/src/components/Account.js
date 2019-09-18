import React from "react";
import ContentDetail from "./ContentDetail";
import ContentTitle from "./ContentTitle";

const Account = ({ pageTitle, object, onCancel }) => {
  const data = object.map(val => {
    if (val[1] !== null && val[1] !== undefined) {
      return (
        <div className="content-detail-row">
          <div className="content-detail-label">{val[0]}:</div>
          <div className="content-detail-value">{val[1]}</div>
        </div>
      );
    } else {
      return null;
    }
  });

  return (
    <ContentDetail classList="main">
      <ContentTitle>{pageTitle}</ContentTitle>
      <hr />
      {data}
      <button className="btn btn-orange">Save</button>
      <button className="btn" onClick={onCancel}>
        Cancel
      </button>
    </ContentDetail>
  );
};

export default Account;
