import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.scss";
import { signUp } from "../../actions";
import { connect } from "react-redux";
function SignUpForm(props) {
  let email, password, firstName, lastName;
  return (
    <div className="auth-form-wrapper">
      <h2 className="form-title">Sign up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.signUp({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
          });
        }}
        className="auth-form-content"
      >
        <input
          className="input-field"
          type="text"
          placeholder="email"
          ref={(node) => {
            email = node;
          }}
        />
        <input
          className="input-field"
          type="password"
          placeholder="password"
          ref={(node) => {
            password = node;
          }}
        />
        <input
          className="input-field"
          type="text"
          placeholder="first name"
          ref={(node) => {
            firstName = node;
          }}
        />
        <input
          className="input-field"
          type="text"
          placeholder="last name"
          ref={(node) => {
            lastName = node;
          }}
        />
        <button type="submit">Sign up</button>
      </form>
      <p className="alternative-text">
        Already have an account? <Link to="/login">Log in here </Link>
      </p>
    </div>
  );
}

export default connect(null, { signUp })(SignUpForm);
