import React from "react";

export default ({ classList, children }) => {
  let classes = `content-title ${classList}`;
  return <h2 className={classes}>{children}</h2>;
};
