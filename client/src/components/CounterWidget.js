import React from "react";
import ContentDetail from "./ContentDetail";
import ContentTitle from "./ContentTitle";

const CounterWidget = ({
  title,
  count,
  buttonVisible,
  buttonText,
  buttonAction
}) => {
  return (
    <ContentDetail classList="widget">
      <div className="flex-row">
        <ContentTitle>{title}</ContentTitle>
        <a href="#">View All ></a>
      </div>
      <hr />
      <div className="flex-row">
        <div className="counter-widget-total">0</div>
        <div className="counter-widget-p">
          There is no data associated with this account.
        </div>
      </div>
    </ContentDetail>
  );
};

export default CounterWidget;
