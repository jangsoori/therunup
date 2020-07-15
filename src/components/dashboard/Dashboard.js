import React, { useState } from "react";
import { signOut } from "../../actions";
import { connect } from "react-redux";
import { getUserRuns, addRun, getUserName } from "../../actions";
import "./Dashboard.scss";
import UserSummary from "./UserSummary";
import Runs from "./Runs";
import { useRef } from "react";
import { Router, Route, Redirect, Switch, Link } from "react-router-dom";
import AddRun from "./content/AddRun";
import { useEffect } from "react";
function Dashboard(props) {
  useEffect(() => {
    if (props.userId) {
      props.getUserName(props.userId);
    }
  }, [props.userId]);

  const [headerMenuVis, setHeaderMenuVis] = useState(false);

  const dashboardRef = useRef(null);

  return (
    <div
      ref={dashboardRef}
      className="dashboard-wrapper"
      onClick={() => setHeaderMenuVis(false)}
    >
      {/* Hide menu on click anywhere but menu icon */}
      <div className="dashboard-header">
        <h2 className="header-welcome">Hello, {props.user.firstName}</h2>
        <i
          className="fas fa-bars dashboard-profile-menu-btn"
          onClick={(e) => {
            //Stop event regarding setting state to false.
            e.stopPropagation();
            setHeaderMenuVis(!headerMenuVis);
          }}
        ></i>
        <div
          className={`dashboard-profile-menu ${headerMenuVis ? "visible" : ""}`}
        >
          <div className="dashboard-profile-menu-content">
            <button className="dashboard-profile-menu-item">View runs</button>
            <button className="dashboard-profile-menu-item">
              Edit profile
            </button>
            <button
              onClick={() => {
                props.signOut();
              }}
              className="dashboard-profile-menu-item"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* <button
          onClick={() =>
            props.addRun({
              name: "Evening run",
              description: "Not too bad",
              distance: 5,
              length: 30,
              avgPace: "6:00",
              userId: props.userId,
            })
          }
        >
          ds
        </button> */}
      </div>
      <Link to="/dashboard/new" style={{ color: "white" }}>
        NEW
      </Link>
      <div className="dashboard-main-content">
        <div className="dashboard-profile-summary">
          <UserSummary />
        </div>

        <div className="dashboard-middle-content">
          <Switch>
            <Route exact path="/dashboard/">
              <div className="dashboard-runs">
                <Runs dbRef={dashboardRef} runs={props.runs} />
              </div>
            </Route>
            <Route path="/dashboard/new">
              <div className="dashboard-add-run">
                <AddRun />
              </div>
            </Route>
          </Switch>
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
