import React from "react";

export default props => {
  let classes = `content-detail ${props.classList}`;
  return <div className={classes}>{props.children}</div>;
};
