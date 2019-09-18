import React from "react";

const ContentBox = props => {
  return (
    <div className="content-container {props.classList ? props.classList : ''}">
      {props.children}
    </div>
  );
};

export default ContentBox;
