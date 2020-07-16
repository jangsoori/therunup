import React, { useState } from "react";
import { signOut } from "../actions";
import { connect } from "react-redux";
import { getUserRuns, addRun, getUserName } from "../actions";
import "./Dashboard.scss";
import UserSummary from "./UserSummary";
import Runs from "../components/dashboard/Runs";
import { useRef } from "react";
import {
  Router,
  Route,
  Redirect,
  Switch,
  Link,
  useParams,
} from "react-router-dom";
import AddRun from "../components/dashboard/content/AddRun";
import EditRun from "../components/dashboard/content/EditRun";
import { useEffect } from "react";
import DeleteRun from "../components/dashboard/content/DeleteRun";

function Dashboard(props) {
  useEffect(() => {
    const abortController = new AbortController();
    if (props.userId) {
      props.getUserName(props.userId);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [props.userId]);

  const dashboardRef = useRef(null);

  return (
    <div
      ref={dashboardRef}
      className="dashboard-wrapper"
      // onClick={() => setHeaderMenuVis(false)}
    >
      {/* Hide menu on click anywhere but menu icon */}
      <div className="dashboard-nav">
        <Link to="/dashboard" className="dashboard-nav-item">
          Dashboard
        </Link>

        <Link className="dashboard-nav-item">View runs</Link>
        <Link className="dashboard-nav-item">Edit profile</Link>
        <Link
          onClick={() => {
            props.signOut();
          }}
          className="dashboard-nav-item"
        >
          Sign out
        </Link>
      </div>

      <div className="dashboard-main-content">
        <div className="dashboard-profile-summary">
          <UserSummary />
        </div>

        <div className="dashboard-middle-content">
          <Route exact path="/dashboard/">
            <div className="dashboard-runs">
              <Runs dbRef={dashboardRef} runs={props.runs} />
            </div>
          </Route>
          <Route exact path="/dashboard/new" component={AddRun}></Route>
          <Route exact path="/dashboard/edit/:id" component={EditRun} />
          <Route exact path="/dashboard/delete/:id" component={DeleteRun} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    runs: state.firestore.ordered.runs,
    user: state.user,
    userId: state.firebase.auth.uid,
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps, {
  signOut,
  getUserName,
  getUserRuns,
  addRun,
})(Dashboard);
