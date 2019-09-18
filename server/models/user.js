const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    emailAddress: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    profileImageUrl: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    roleName: {
      type: String,
      enum: ["KAD_USER", "OFFICE_USER", "ADMIN_USER"],
      required: true
    },
    passwordLastChangedDate: {
      type: Date
    },
    registeredDate: {
      type: Date
    },
    invitationDate: {
      type: Date
    },
    address: {
      addressLine1: {
        type: String,
        default: ""
      },
      addressLine2: {
        type: String
      },
      city: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: ""
      },
      postalCode: {
        type: String,
        default: ""
      }
    },
    securityQuestions: [
      {
        question: {
          type: String
        },
        answer: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
);

// We need to has the password if it has been modified on the pre save event
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    this.passwordLastChangedDate = Date.now();
    return next();
  } catch (err) {
    return next(err);
  }
});

// instance method that accepts a password and then compares it to the password in the model
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (err) {
    next(err);
  }
};
module.exports = mongoose.model("User", userSchema);
