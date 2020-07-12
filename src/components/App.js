import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addRun } from "../actions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Router, Route } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import history from "../history";
import firebase from "firebase/app";

import ProtectedRoute from "./ProtectedRoute";

import "../reset.css";
import "./App.scss";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
function App(props) {
  //Check if user is logged in (go to dashboard), if not, go to login page
  firebase.auth().onAuthStateChanged((user) => {
    user ? history.push("/") : history.push("/login");
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
        <div className="auth-screen-wrapper">
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignUpForm} />
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    runs: state.firestore.data,
    user: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps, { addRun }),
  firestoreConnect([{ collection: "runs" }])
)(App);
