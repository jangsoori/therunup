import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { changePassword, changeEmail } from "../../../actions/authActions";
import { getUserName, changeName } from "../../../actions/userActions";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

//Submit validation function
const onFail = (msg) => {
  return (
    <div class="ui error message">
      <div class="header">Error</div>
      <p>{msg}</p>
    </div>
  );
};

const onSuccess = (msg) => {
  return (
    <div class="ui success message">
      <div class="header">Success</div>
      <p>{msg}</p>
    </div>
  );
};

function Settings(props) {
  const [activeItem, setActiveItem] = useState("userInfo");

  //Render view functions
  ////////////////////////////////////////////
  ///Change user's first name and last name///
  const renderUserInfoSettings = () => {
    ////////////////////////////////////////
    ///Submit functions (react final form)///
    const onSubmitName = (formValues) => {
      const { firstName, lastName } = formValues;
      //call action to change name
      props.changeName(firstName, lastName);
      //get updated name
      getUserName(props.auth.uid);
    };
    const onSubmitEmail = (formValues) => {
      const { email } = formValues;
      props.changeEmail(email);
    };
    /////////////////////////////////////////
    //////////////Render forms//////////////
    return (
      //User's display name form
      <div className="userInfoForms" style={{ display: "grid", gap: "2rem" }}>
        <Form
          onSubmit={onSubmitName}
          render={({ handleSubmit }) => (
            <form
              className="ui massive form error success"
              onSubmit={handleSubmit}
            >
              {/* Check if form was submitted successfuly and render message */}
              {props.err.usernameChange
                ? props.err.usernameChange.type === "success"
                  ? onSuccess("Username changed")
                  : onFail("Please try again")
                : null}
              <div className="field">
                <label htmlFor="">First name</label>
                <Field
                  initialValue={props.user.firstName}
                  name="firstName"
                  component="input"
                  placeholder="First name"
                />
              </div>
              <div className="field">
                <label htmlFor="">Last name</label>
                <Field
                  initialValue={props.user.lastName}
                  name="lastName"
                  component="input"
                  placeholder="Last name"
                />
              </div>

              <button className="ui button massive" type="submit">
                Change name
              </button>
            </form>
          )}
        />

        {/* User's email */}
        <Form
          onSubmit={onSubmitEmail}
          render={({ handleSubmit }) => (
            <form
              className="ui massive form success error"
              onSubmit={handleSubmit}
            >
              {/* Check if form was submitted successfuly and render message */}
              {props.err.emailChange
                ? props.err.emailChange.type === "success"
                  ? onSuccess("Email changed")
                  : onFail("Please try again")
                : null}
              <div className="field">
                <label htmlFor="">Email</label>
                <Field
                  initialValue={props.user.email}
                  name="email"
                  component="input"
                  placeholder="Email"
                />
              </div>

              <button className="ui button massive" type="submit">
                Change email
              </button>
            </form>
          )}
        />
      </div>
    );
  };
  ///////////////////////////////////////
  ///////////Render password settings////
  const renderPasswordSettings = () => {
    const onSubmit = (formValues) => {
      const { oldPassword, newPassword, newPasswordRepeat } = formValues;

      if (newPassword === newPasswordRepeat) {
        props.changePassword(oldPassword, newPassword);
      }
    };

    //Render form
    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            className="ui form massive error success"
            onSubmit={handleSubmit}
          >
            {props.err.passwordChange
              ? props.err.passwordChange.type === "success"
                ? onSuccess("Password changed")
                : onFail(props.err.passwordChange.message)
              : null}

            <div className="field">
              <label htmlFor="">Old password</label>
              <Field
                name="oldPassword"
                component="input"
                type="password"
                placeholder="Old password"
              />
            </div>
            <div className="field">
              <label htmlFor="">New password</label>
              <Field
                name="newPassword"
                component="input"
                type="password"
                placeholder="New password"
              />
            </div>
            <div className="field">
              <label htmlFor="">Repeat new password</label>
              <Field
                name="newPasswordRepeat"
                component="input"
                type="password"
                placeholder="New password"
              />
            </div>
            <button className="ui button massive" type="submit">
              Submit
            </button>
          </form>
        )}
      />
    );
  };

  //Render menu with forms
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <div className="dashboard-content-settings">
      <h1 className="dashboard-content-title">Profile settings</h1>
      <div className="settings-content">
        <Menu size="massive" attached="top" tabular>
          <Menu.Item
            name="userInfo"
            active={activeItem === "userInfo"}
            onClick={handleItemClick}
          />

          <Menu.Item
            name="password"
            active={activeItem === "password"}
            onClick={handleItemClick}
          />
        </Menu>
        <Segment size="massive" attached="bottom">
          {activeItem === "userInfo"
            ? renderUserInfoSettings()
            : renderPasswordSettings()}
        </Segment>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    err: state.auth,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, {
  changePassword,
  changeName,
  changeEmail,
  getUserName,
})(Settings);
