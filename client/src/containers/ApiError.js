import React from "react";
import { connect } from "react-redux";

function ApiError(props) {
  if (props.errorText) {
    return <div className="page-error">{props.errorText}</div>;
  } else {
    return "";
  }
}

function mapStateToProps(state) {
  return {
    errorText: state.error.error
  };
}

export default connect(
  mapStateToProps,
  null
)(ApiError);
