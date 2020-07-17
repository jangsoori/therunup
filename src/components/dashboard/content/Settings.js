import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { changePassword, changeName } from "../../../actions/authActions";
import { getUserName } from "../../../actions/userActions";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
function Settings(props) {
  const [activeItem, setActiveItem] = useState("userInfo");
  const renderUserInfoSettings = () => {
    const onSubmit = (formValues) => {
      const { firstName, lastName } = formValues;

      props.changeName(firstName, lastName);

      getUserName(props.auth.uid);
    };
    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              initialValue={props.user.firstName}
              name="firstName"
              component="input"
              placeholder="First name"
            />

            <Field
              initialValue={props.user.lastName}
              name="lastName"
              component="input"
              placeholder="Last name"
            />

            <button type="submit">Submit</button>
          </form>
        )}
      />
    );
  };
  const renderPasswordSettings = () => {
    const onSubmit = (formValues) => {
      const { oldPassword, newPassword } = formValues;

      props.changePassword(oldPassword, newPassword);
    };
    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="oldPassword"
                component="input"
                type="password"
                placeholder="Old password"
              />
            </div>
            <div>
              <Field
                name="newPassword"
                component="input"
                type="password"
                placeholder="New password"
              />
            </div>
            <button type="submit">Submit</button>
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
  getUserName,
})(Settings);
