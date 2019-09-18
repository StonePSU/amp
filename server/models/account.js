const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  accountName: {
    type: String,
    required: true
  },
  kadNumber: {
    type: String,
    unique: true
  },
  accountType: {
    type: String,
    enum: ["OFFICE", "KAD"],
    required: true
  },
  registeredDate: {
    type: Date
  },
  address: {
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      enum: ["US"],
      required: true,
      default: "US"
    }
  }
});

// accountSchema.pre("findOneAndUpdate", next => {
//   console.log(this);
//   if (this.isModified("kadNumber")) {
//     console.log("kad number has been modified");
//     let err = new Error("Cannot update KAD Number");
//     err.status(500);
//     return next(err);
//   } else {
//     console.log("kad number has NOT BEEN MODIFIED");
//     return next();
//   }
// });

module.exports = mongoose.model("Account", accountSchema);
