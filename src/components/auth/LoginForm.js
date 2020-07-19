import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./LoginForm.scss";
import { logIn } from "../../actions/authActions";
import { Form, Field } from "react-final-form";

const required = (value) => (value ? undefined : "Required");

function LoginScreen(props) {
  let email, password;

  return (
    <div className="auth-form-wrapper">
      <h2 className="form-title">Log in</h2>
      <Form
        onSubmit={(e) => {
          props.logIn(email.value, password.value);
        }}
        render={({ handleSubmit }) => (
          <form className="auth-form-content" onSubmit={handleSubmit}>
            <Field
              component="input"
              name="email"
              className="input-field"
              type="text"
              placeholder="email"
              ref={(node) => (email = node)}
              validate={required}
            />
            <Field
              component="input"
              name="password"
              className="input-field"
              type="password"
              placeholder="password"
              ref={(node) => (password = node)}
              validate={required}
            />
            <button type="submit">login</button>
            {props.errMsg ? props.errMsg : null}
          </form>
        )}
      ></Form>
      <p className="alternative-text">
        Not registered? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errMsg: state.auth.authError.message,
  };
};
export default connect(mapStateToProps, { logIn })(LoginScreen);
