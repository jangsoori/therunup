import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./LoginForm.scss";
import { logIn } from "../../actions";

function LoginScreen(props) {
  let email, password;
  return (
    <div className="auth-form-wrapper">
      <h2 className="form-title">Log in</h2>
      <form
        className="auth-form-content"
        onSubmit={(e) => {
          e.preventDefault();
          props.logIn(email.value, password.value);
        }}
      >
        <input
          className="input-field"
          type="text"
          placeholder="email"
          ref={(node) => (email = node)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="password"
          ref={(node) => (password = node)}
        />
        <button type="submit">login</button>
      </form>
      <p className="alternative-text">
        Not registered? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}

export default connect(null, { logIn })(LoginScreen);
