import React, { Component } from "react";
import Account from "../components/Account";
import CounterWidget from "../components/CounterWidget";
import ContentBox from "../components/ContentBox";
import PageTitle from "../components/PageTitle";
import { connect } from "react-redux";
import { getAccountById } from "../store/actions/account";

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ""
    };
  }

  componentDidMount() {
    // TODO: Might not get the actual account from the redux store initially, e.g. someone comes to this account through a bookmarked link.
    // need to account for this by making an API call to get the account if we don't already have it in the store.
    const accountId = this.props.match.params.accountId;
    const account = this.props.accounts.filter(val => {
      return val._id === accountId;
    })[0];

    if (!account || account.length === 0) {
      /*this.props.getAccountById(accountId).then(account => {
        this.setState({ account });
      });*/
    } else {
      this.setState({ account });
    }
  }

  prepareData(obj) {
    const middle = {};
    const final = [];
    const translation = {
      accountType: "Account Type",
      kadNumber: "KAD Number",
      addressLine1: "Street Address",
      city: "City",
      state: "State",
      postalCode: "Postal Code",
      registeredDate: "Registration Date"
    };

    function translateObject(obj) {
      for (let key in obj) {
        if (typeof obj[key] !== "object") {
          if (key in translation) {
            middle[translation[key]] = obj[key];
          }
        } else {
          translateObject(obj[key]);
        }
      }
    }
    translateObject(obj);

    for (let key in translation) {
      final.push([translation[key], middle[translation[key]]]);
    }

    return final;
  }

  handleCancel(e) {
    console.log(e);
    e.goBack();
  }

  render() {
    const data = this.prepareData(this.state.account);
    return (
      <ContentBox>
        <PageTitle>{this.state.account.accountName}</PageTitle>
        <div className="content-grid">
          <Account
            pageTitle="Account Details"
            object={data}
            onCancel={this.handleCancel.bind(this, this.props.history)}
          />
          <CounterWidget title="Office Accounts" />
          <CounterWidget title="Brewers" />
          <CounterWidget title="Users" />
        </div>
      </ContentBox>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.account
  };
}

export default connect(
  mapStateToProps,
  { getAccountById }
)(AccountContainer);
