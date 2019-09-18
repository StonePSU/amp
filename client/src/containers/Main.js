import AuthForm from "../components/Forms/AuthForm";
import React from "react";
import Header from "../components/Header";
import HomePage from "../components/HomePage";
// import Test from "../components/Test";
import AccountList from "../containers/AccountList";
import ProfileContainer from "../containers/ProfileContainer";
import Loading from "../containers/Loading";
import AccountContainer from "./AccountContainer";
import ImageUpload from "../components/ImageUpload";
import PageNotFound from "../components/PageNotFound";
import KADRegistrationForm from "../components/Forms/KADRegistrationForm";
import AccountRegistration from "../components/Forms/AccountRegistration";
import { Route, Switch } from "react-router-dom";
import RegistrationConfirmation from "../components/RegistrationConfirmation";
import { register, logoutUser } from "../store/actions/auth";
import { connect } from "react-redux";
import withAuth from "../hocs/withAuth";

function Main(props) {
  const { register, logoutUser, isAuthenticated } = props;
  return (
    <main>
      <Header isAuthenticated={isAuthenticated} logout={logoutUser} />
      <Loading />
      <Switch>
        <Route path="/" exact component={withAuth(HomePage)} />
        <Route
          path="/signup/confirmation"
          component={withAuth(RegistrationConfirmation)}
        />
        <Route
          path="/signup"
          render={props => {
            return <AuthForm signup register={register} {...props} />;
          }}
        />
        <Route
          path="/signin"
          render={props => {
            return <AuthForm register={register} {...props} />;
          }}
        />
        <Route path="/accounts/account-registration" component={withAuth(AccountRegistration)} />

        <Route path="/accounts/kad-registration" component={withAuth(KADRegistrationForm)} />
        <Route path="/accounts/:accountId" component={withAuth(AccountContainer)} />
        <Route
          path="/accounts"
          render={props => {
            return <AccountList {...props} />;
          }}
        />
        <Route path="/upload" component={ImageUpload} />
        <Route path="/my-profile" component={withAuth(ProfileContainer)} />
        {/* <Route path="/test" component={Test} /> */}
        <Route component={PageNotFound} />
      </Switch>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}
export default connect(
  mapStateToProps,
  { register, logoutUser }
)(Main);
