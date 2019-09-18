import React, { Component } from 'react';
import ContentBox from "../ContentBox";
import ContentDetail from "../ContentDetail";
import ApiError from "../../containers/ApiError";
import { FloatingLabelInput } from "../FormFields/FormFields";
import { SubmitButton } from "../Buttons";
import { connect } from "react-redux";
import { addAccount } from "../../store/actions/account";
import Loading from "../../containers/Loading";

class KADRegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kadNumber: "",
            accountName: "",
            accountType: "KAD",
            address: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalCode: ""
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(accessor, e) {
        let kad = { ...this.state };
        let { name, value } = e.target;

        if (accessor) {
            kad[accessor][name] = value;
        } else {
            kad[name] = value;
        }
        this.setState(kad);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addAccount(this.state).then((data) => {
            // console.log("NEW ACCOUNT CREATED");
            // console.log(data);
            this.props.history.push(`/accounts/${data._id}`)
        })
    }

    render() {
        return (
            <ContentBox>
                <Loading />
                <ContentDetail classList="narrow">
                    <ApiError />
                    <p>Please add the following KAD account details.</p>
                    <form action="" onSubmit={this.handleSubmit}>
                        <FloatingLabelInput name="kadNumber" label="KAD #" type="text" value={this.state.kadNumber} handleChange={this.handleChange.bind(this, null)} required />
                        <FloatingLabelInput name="accountName" label="KAD Account Name" type="text" value={this.state.accountName} handleChange={this.handleChange.bind(this, null)} required />
                        <FloatingLabelInput name="addressLine1" label="Address Line 1" type="text" value={this.state.address.addressLine1} handleChange={this.handleChange.bind(this, "address")} required />
                        <FloatingLabelInput name="addressLine2" label="Address Line 2 (optional)" value={this.state.address.addressLine2} handleChange={this.handleChange.bind(this, "address")} type="text" />
                        <FloatingLabelInput name="city" label="City" type="text" value={this.state.address.city} handleChange={this.handleChange.bind(this, "address")} required />
                        <FloatingLabelInput name="state" label="State / Prov" type="text" value={this.state.address.state} handleChange={this.handleChange.bind(this, "address")} required />
                        <FloatingLabelInput name="postalCode" label="ZIP / Postal Code" value={this.state.address.postalCode} type="text" handleChange={this.handleChange.bind(this, "address")} required />
                        <SubmitButton buttonText="Save" />
                    </form>
                </ContentDetail>
            </ContentBox>
        )

    }
}

export default connect(null, { addAccount })(KADRegistrationForm);