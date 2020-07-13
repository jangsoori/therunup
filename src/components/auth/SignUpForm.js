import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.scss";
import { signUp } from "../../actions";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

function SignUpForm(props) {
  let email, password, firstName, lastName;
  return (
    <div className="auth-form-wrapper">
      <h2 className="form-title">Sign up</h2>
      <Form
        onSubmit={(e) => {
          props.signUp({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
          });
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="auth-form-content">
            <Field
              className="input-field"
              name="email"
              type="text"
              placeholder="email"
              ref={(node) => {
                email = node;
              }}
              component="input"
            />
            <Field
              name="password"
              className="input-field"
              type="password"
              placeholder="password"
              ref={(node) => {
                password = node;
              }}
              component="input"
            />
            <Field
              name="firstName"
              className="input-field"
              type="text"
              placeholder="first name"
              ref={(node) => {
                firstName = node;
              }}
              component="input"
            />
            <Field
              name="lastName"
              className="input-field"
              type="text"
              placeholder="last name"
              ref={(node) => {
                lastName = node;
              }}
              component="input"
            />
            <button type="submit">Sign up</button>
            {props.errMsg ? props.errMsg : null}
          </form>
        )}
      ></Form>
      <p className="alternative-text">
        Already have an account? <Link to="/login">Log in here </Link>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errMsg: state.auth.authError.message,
  };
};
export default connect(mapStateToProps, { signUp })(SignUpForm);
