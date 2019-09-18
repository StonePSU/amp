import React, { Component } from "react";
import "./AuthForm.css";
import { SubmitButton } from "../Buttons";
import { FieldError } from "../Error.js";
import ApiError from "../../containers/ApiError";
import ContentBox from "../ContentBox";
import ContentDetail from "../ContentDetail";
import { FloatingLabelInput } from "../FormFields/FormFields";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstError: "",
      lastName: "",
      lastError: "",
      emailAddress: "",
      emailError: "",
      phoneNumber: "",
      phoneError: "",
      password: "",
      passwordError: "",
      confirmPassword: "",
      confirmError: "",
      roleName: "KAD_USER"
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(e) {
    let state = { ...this.state };
    this.setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { password, confirmPassword } = this.state;

    // reset errors
    this.setState({
      firstError: "",
      lastError: "",
      phoneError: "",
      emailError: "",
      passwordError: "",
      confirmError: ""
    });

    if (this.props.signup) {
      if (confirmPassword !== password) {
        this.setState({
          confirmError: "Confirm Password does not match Password"
        });
        return;
      }
    }

    this.props.register(this.props.signup, this.state).then(() => {
      if (this.props.signup) {
        this.props.history.push("/signup/confirmation");
      } else {
        this.props.history.push("/");
      }
    });
  }

  render() {
    let {
      firstName,
      firstError,
      lastName,
      lastError,
      phoneNumber,
      phoneError,
      password,
      passwordError,
      confirmPassword,
      confirmError,
      emailAddress,
      emailError
    } = this.state;
    const { signup } = this.props;
    return (
      <ContentBox>
        <ContentDetail classList="narrow">
          <ApiError />
          {signup ? (
            <p className="page-instruction">
              Please provide the following information to help us create your
              account.
            </p>
          ) : null}
          <form action="" onSubmit={this.handleSubmit}>
            {signup ? (
              <React.Fragment>
                <FloatingLabelInput
                  type="text"
                  name="firstName"
                  value={firstName}
                  handleChange={this.handleUpdate}
                  label="First Name*"
                  required
                />
                <FieldError errorText={firstError} />
                <FloatingLabelInput
                  type="text"
                  name="lastName"
                  value={lastName}
                  handleChange={this.handleUpdate}
                  label="Last Name*"
                  required
                />
                <FieldError errorText={lastError} />
              </React.Fragment>
            ) : null}
            <FloatingLabelInput
              type="text"
              name="emailAddress"
              required
              value={emailAddress}
              handleChange={this.handleUpdate}
              label="Email Address*"
            />
            <FieldError errorText={emailError} />
            {signup ? (
              <React.Fragment>
                <FloatingLabelInput
                  type="phone"
                  name="phoneNumber"
                  required
                  value={phoneNumber}
                  handleChange={this.handleUpdate}
                  label="Phone Number*"
                />
                <FieldError errorText={phoneError} />
              </React.Fragment>
            ) : null}
            <FloatingLabelInput
              type="password"
              name="password"
              required
              value={password}
              handleChange={this.handleUpdate}
              label="Password*"
            />
            <FieldError errorText={passwordError} />
            {signup ? (
              <React.Fragment>
                <FloatingLabelInput
                  type="password"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  handleChange={this.handleUpdate}
                  label="Confirm Password*"
                />
                <FieldError errorText={confirmError} />
              </React.Fragment>
            ) : null}
            <SubmitButton buttonText={signup ? "Confirm" : "Log In"} />
          </form>
        </ContentDetail>
      </ContentBox>
    );
  }
}

export default AuthForm;
