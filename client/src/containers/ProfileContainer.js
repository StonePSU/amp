import { connect } from "react-redux";
import React, { Component } from "react";
import ContentBox from "../components/ContentBox";
import MyProfile from "../components/MyProfile";
import { getProfile } from "../store/actions/profile";
import Loading from "./Loading";

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getProfile().then(data => {

      this.setState({
        profile: data
      });

    });
  }

  handleChange(e) {
    console.log(e.target.name)
    let profile = this.state;
    if (e.target.name === 'addressLine1' || e.target.name === 'city' || e.target.name === 'state' || e.target.name === 'postalCode') {
      profile.profile.address[e.target.name] = e.target.value;
    } else {
      profile.profile[e.target.name] = e.target.value;
    }
    this.setState(profile)
  }

  render() {
    return (
      <ContentBox>
        <Loading />
        {this.state.profile ? <MyProfile profile={this.state.profile} handleChange={this.handleChange} /> : null}
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
  { getProfile }
)(ProfileContainer);
