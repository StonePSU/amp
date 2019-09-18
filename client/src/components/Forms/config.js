export const KAD_ACCOUNT = {
    formFields: [
        {
            type: "text",
            name: "kadNumber",
            label: "KAD Number",
            required: true
        },
        {
            type: "text",
            name: "accountName",
            label: "Account Name",
            required: true
        },
        {
            type: "hidden",
            name: "accountType",
            label: "Account Type",
            required: true
        },
        {
            type: "text",
            name: "addressLine1",
            label: "Address Line 1",
            required: true
        },
        {
            type: "text",
            name: "addressLine2",
            label: "Address Line 2 (optional)",
            required: false
        },
        {
            type: "text",
            name: "city",
            label: "City",
            required: true
        },
        {
            type: "text",
            name: "state",
            label: "State",
            required: true
        },
        {
            type: "text",
            name: "postalCode",
            label: "Postal Code",
            required: true
        }
    ],
    payload: {
        kadNumber: "",
        accountName: "",
        accountType: "",
        address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: ""
        }
    }
}