import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addRun } from "../actions";
import { compose } from "redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Router, Route } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import history from "../history";
import firebase from "firebase/app";

import ProtectedRoute from "./ProtectedRoute";

import "../reset.css";
import "./App.scss";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";

// const user = firebase.auth().currentUser;

function App(props) {
  //Check if user is logged in (go to dashboard), if not, go to login page
  firebase.auth().onAuthStateChanged((user) => {
    user ? history.push("/") : history.push("/login");
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
      <div className="app-container">
        <ProtectedRoute
          user={props.user.uid}
          exact
          path="/"
          component={Dashboard}
        />
        <Route path="/login">
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
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(App);
