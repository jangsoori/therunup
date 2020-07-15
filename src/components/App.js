import React, { useEffect, useS } from "react";
import { connect } from "react-redux";

import { useFirestoreConnect } from "react-redux-firebase";
import { Router, Route, Redirect } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import history from "../history";
import firebase from "firebase/app";

import "../reset.css";
import "./App.scss";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";

// const user = firebase.auth().currentUser;

function App(props) {
  //Check if user is logged in (go to dashboard), if not, go to login page
  firebase.auth().onAuthStateChanged((user) => {
    !user && history.push("/login");
  });

  useFirestoreConnect(() => {
    if (props.user.uid) {
      return [
        {
          collection: "runs",
          where: [["userId", "==", props.user.uid]],
        },
      ];
    }
  });
  return (
    <Router history={history}>
      <div className="container">
        <div className="app-container">
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login">
            {props.user.uid && <Redirect to="/" />}
            <div className="auth-screen-wrapper">
              <LoginForm />
            </div>
          </Route>
          <Route path="/signup">
            <div className="auth-screen-wrapper">
              <SignUpForm />
            </div>
          </Route>
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(App);
