import React from "react";
import ContentTitle from "./ContentTitle";
import ContentDetail from "./ContentDetail";
import ImageUpload from "./ImageUpload";
import { SubmitButton, ButtonOutlined } from "./Buttons";
import { FloatingLabelInput } from "./FormFields/FormFields";

export default ({ profile, handleChange }) => {

  return (
    <ContentDetail>
      <ContentTitle classList="big">{`${profile.firstName} ${
        profile.lastName
        }`}</ContentTitle>
      <hr />
      <form name="profile" action="">
        <div>
          <h2>Profile & Contact Information</h2>
          <div className="flex-row">
            <div className="flex-50">
              {/* <ImageUpload /> */}
            </div>
            <div className="flex-50">
              <FloatingLabelInput
                type="text"
                name="addressLine1"
                required
                label="StreetAddress"
                value={profile.address.addressLine1}
                handleChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                name="city"
                required
                label="City"
                value={profile.address.city}
                handleChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                name="state"
                required
                label="State"
                value={profile.address.state}
                handleChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                name="postalCode"
                required
                label="Postal Code"
                value={profile.address.postalCode}
                handleChange={handleChange}
              />
              <br />
              <FloatingLabelInput
                type="email"
                name="emailAddress"
                required
                label="Email Address"
                value={profile.emailAddress}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-50">
            <hr />
            <h2>Password</h2>
            <p>
              Choose a password that's hard to guess and unique for this
              account.
            </p>
            <FloatingLabelInput
              type="password"
              name="currentPassword"
              required
              label="Current Password"
              value={profile.currentPassword}
              onChange={handleChange}
            />
            <FloatingLabelInput
              type="password"
              name="newPassword"
              required
              label="Create new password"
              value={profile.newPassword}
              onChange={handleChange}
            />
            <FloatingLabelInput
              type="password"
              name="confirmPassword"
              required
              label="Confirm new password"
              value={profile.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex-50">
            <hr />
            <h2>Security Questions</h2>
            <p>
              These security questions will help us make sure it's your account
              if you ever need to reset your password.
            </p>
            <p>Security Question 1</p>
            <div className="control">
              <select name="question1">
                <option value="Mother's Maiden Name">
                  What is your mother's maiden name?
                </option>
                <option value="Childhood Pet Name">
                  What was the name of your favorite childhood pet?
                </option>
              </select>
            </div>
            <FloatingLabelInput
              type="text"
              name="answer1"
              required
              label="Answer"
            />
            <p>Security Question 2</p>
            <div className="control">
              <select name="question2">
                <option value="Mother's Maiden Name">
                  What is your mother's maiden name?
                </option>
                <option value="Childhood Pet Name">
                  What was the name of your favorite childhood pet?
                </option>
              </select>
            </div>
            <FloatingLabelInput
              type="text"
              name="answer2"
              required
              label="Answer"
            />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-50">
            <SubmitButton buttonText="Save" />
            <ButtonOutlined buttonText="Cancel" />
            <ButtonOutlined buttonText="Delete" />
          </div>
        </div>
      </form>
    </ContentDetail>
  );
};
