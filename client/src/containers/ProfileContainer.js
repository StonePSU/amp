import { connect } from "react-redux";
import React, { Component } from "react";
import ContentBox from "../components/ContentBox";
import MyProfile from "../components/MyProfile";
import { getProfile, updateProfile } from "../store/actions/profile";
import Loading from "./Loading";

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: ""
      },
      securityQuestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  componentDidMount() {
    this.props.getProfile().then(data => {
      this.setState(data);
    });
  }

  handleAddressChange(e) {
    // TODO: complete this function.  then make sure when we save the profile it updates the user and state
    e.preventDefault();
    this.props.updateProfile(this.state)
      .then(res => {
        this.props.getProfile().then(data => {
          this.setState(data);
        })
      });
  }

  handleChange(e) {
    let profile = this.state;
    if (e.target.name === 'addressLine1' || e.target.name === 'city' || e.target.name === 'state' || e.target.name === 'postalCode') {
      profile.address[e.target.name] = e.target.value;
    } else {
      profile[e.target.name] = e.target.value;
    }
    this.setState(profile)
  }

  render() {
    return (
      <ContentBox>
        <Loading />
        {this.state ? <MyProfile profile={this.state} handleChange={this.handleChange} handleAddressChange={this.handleAddressChange} /> : null}
      </ContentBox>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  { getProfile, updateProfile }
)(ProfileContainer);
