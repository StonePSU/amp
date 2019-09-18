import React, { Component } from 'react';
import ContentBox from "../ContentBox";
import ContentDetail from "../ContentDetail";
import ApiError from "../../containers/ApiError";
import { FloatingLabelInput } from "../FormFields/FormFields";
import { SubmitButton } from "../Buttons";
import { connect } from "react-redux";
import { addAccount } from "../../store/actions/account";
import Loading from "../../containers/Loading";
import { KAD_ACCOUNT } from "./config";

class AccountRegistration extends Component {
    constructor(props) {
        super(props);
        /*
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
        }*/

        this.state = {
            kadNumber: "",
            accountName: "",
            accountType: "OFFICE",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let kad = { ...this.state };
        let { name, value } = e.target;
        /*
        if (accessor) {
            kad[accessor][name] = value;
        } else {
            kad[name] = value;
        }*/
        kad[name] = value;
        this.setState(kad);
    }

    _mapStateToPayload(state, payload) {
        let stateKeys = Object.keys(state);
        // TODO: COMPLETE THIS FUNCTION
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addAccount(this.state).then((data) => {
            this.props.history.push(`/accounts/${data._id}`)
        })
    }

    render() {
        let formFields = KAD_ACCOUNT.formFields.map((field, index) => {
            return <FloatingLabelInput key={index} name={field.name} label={field.label} type={field.type} value={this.state[field.name]} handleChange={this.handleChange} {...field.required} />
        })
        return (
            <ContentBox>
                <Loading />
                <ContentDetail classList="narrow">
                    <ApiError />
                    <p>Please add the following KAD account details.</p>
                    <form action="" onSubmit={this.handleSubmit}>
                        {formFields}
                        <SubmitButton buttonText="Save" />
                    </form>
                </ContentDetail>
            </ContentBox>
        )

    }
}

export default connect(null, { addAccount })(AccountRegistration);