import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import {
  changePassword,
  changeName,
  changeEmail,
} from "../../../actions/authActions";
import { getUserName } from "../../../actions/userActions";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
function Settings(props) {
  const [activeItem, setActiveItem] = useState("userInfo");
  const renderUserInfoSettings = () => {
    const onSubmitName = (formValues) => {
      const { firstName, lastName } = formValues;

      props.changeName(firstName, lastName);

      getUserName(props.auth.uid);
    };
    const onSubmitEmail = (formValues) => {
      const { email } = formValues;
      props.changeEmail(email);
    };
    return (
      <div className="userInfoForms" style={{ display: "grid", gap: "2rem" }}>
        <Form
          onSubmit={onSubmitName}
          render={({ handleSubmit }) => (
            <form className="ui massive form" onSubmit={handleSubmit}>
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

        <Form
          onSubmit={onSubmitEmail}
          render={({ handleSubmit }) => (
            <form className="ui massive form" onSubmit={handleSubmit}>
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
  const renderPasswordSettings = () => {
    const onSubmit = (formValues) => {
      const { oldPassword, newPassword, newPasswordRepeat } = formValues;

      if (newPassword === newPasswordRepeat) {
        props.changePassword(oldPassword, newPassword);
      }
    };
    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form className="ui form massive" onSubmit={handleSubmit}>
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
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, {
  changePassword,
  changeName,
  changeEmail,
  getUserName,
})(Settings);
