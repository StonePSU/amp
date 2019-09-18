import React from "react";
import "./Loading.css";
import { connect } from "react-redux";

function Loading(props) {
  if (props.loading) {
    return <div className="loading" />;
  } else {
    return "";
  }
}

function mapStateToProps(state) {
  return {
    loading: state.api.loading
  };
}

export default connect(
  mapStateToProps,
  null
)(Loading);
