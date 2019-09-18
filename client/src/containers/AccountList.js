import React, { Component } from "react";
import queryString from "query-string";
//import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { queryAccounts } from "../store/actions/account";
import { Button } from "../components/Buttons";
//import AccountListHeader from "../components/AccountListHeader";
//import AccountListItem from "../components/AccountListItem";
import ContentBox from "../components/ContentBox";
import PageTitle from "../components/PageTitle";
import ContentDetail from "../components/ContentDetail";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from 'react-router-dom';

class AccountList extends Component {
  componentDidMount() {
    this.props.queryAccounts();
  }

  handleClick(id) {
    this.props.history.push(`/accounts/${id}`);
  }

  render() {
    // Higher Order Function used to filter accounts by type
    const filterByType = type => {
      return function (val) {
        return val.accountType === type;
      };
    };
    const values = queryString.parse(this.props.location.search);
    const type = values.type;
    const accounts = this.props.accounts;
    let accountList;

    accountList = accounts.filter(filterByType(type.toUpperCase()));
    // accountList = accounts.filter(filterByType(type.toUpperCase())).map(val => {
    //   return (
    //     <AccountListItem
    //       type={type}
    //       key={val._id}
    //       {...val}
    //       onClick={this.handleClick.bind(this)}
    //     />
    //   );
    // });

    // if (type !== "KAD" && type !== "Office") {
    //   return <Redirect to="/not-found" />;
    // }

    // Set columns for ReactTable
    const columns = [
      {
        Header: "id",
        accessor: "_id",
        show: false
      },
      {
        Header: "Account Name",
        accessor: "accountName"
      },
      {
        Header: "Street Address",
        accessor: d => d.address.addressLine1,
        id: "addressLine1"
      },
      {
        Header: "City",
        accessor: d => d.address.city,
        id: "city"
      },
      {
        Header: "State",
        accessor: d => d.address.state,
        id: "state"
      },
      {
        Header: "Postal Code",
        accessor: d => d.address.postalCode,
        id: "postalCode"
      }
    ];

    if (type === "KAD") {
      columns.unshift({ Header: "KAD Number", accessor: "kadNumber" });
    }

    return (
      <ContentBox>
        <PageTitle>
          {type === "KAD" ? "KAD Registration" : "Office Accounts"}
        </PageTitle>
        <ContentDetail>
          <React.Fragment>
            {/* <AccountListHeader type={type} />
            {accountList} */}
            <ReactTable
              data={accountList}
              columns={columns}
              showPagination={false}
              minRows={1}
              getTdProps={(state, rowInfo, columnInfo, instance) => {
                return {
                  onClick: e => {
                    this.handleClick(rowInfo.row._id);
                  }
                };
              }}
            />
          </React.Fragment>
        </ContentDetail>
        <div className="btn">
          <Link to="/accounts/kad-registration" >REGISTER</Link></div>
      </ContentBox >
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
  { queryAccounts }
)(AccountList);
