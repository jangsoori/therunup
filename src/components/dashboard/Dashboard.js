//React imports
import React, { useEffect, useRef } from "react";

//React Router import
import { Link } from "react-router-dom";

//React Redux imports
import { connect } from "react-redux";

//Action imports
import { getUserRuns, getUserName } from "../../actions/userActions";
import { signOut } from "../../actions/authActions";
//Components
import DashboardContent from "./DashboardContent";
//Style imports
import "./Dashboard.scss";
//Utilities
import moment from "moment";
//Main Component
function Dashboard(props) {
  //Dashboard ref for run item menu
  const dashboardRef = useRef(null);
  //Fetch user name on page load
  useEffect(() => {
    const abortController = new AbortController();
    if (props.userId) {
      props.getUserName(props.userId);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [props.userId]);

  if (!props.runs) {
    return null;
  }
  //Calculate stats

  const displayTotalDuration = (duration) => {
    return moment.utc(duration * 1000).format("HH:mm:ss");
  };

  const totalRuns = props.runs.length;
  const totalDistance = (arr) => {
    const total = arr.reduce((a, b) => {
      return +a + +b.totalDistanceMeters;
    }, 0);
    return (total / 1000).toFixed(2);
  };
  const totalDuration = (arr) => {
    const total = arr.reduce((a, b) => {
      return +a + +b.totalDurationSeconds;
    }, 0);
    return displayTotalDuration(total);
  };

  return (
    <div className="dashboard-container" ref={dashboardRef}>
      <div className="dashboard-side">
        <div className="dashboard-side-user">
          <h3 className="dashboard-side-user-name">Gracjan Kolodziej</h3>
          <img
            src="https://i.pravatar.cc/150"
            className="dashboard-side-user-avatar"
            alt=""
          />
        </div>

        <div className="dashboard-side-stats">
          <div className="dashboard-side-stats-item">
            <p>Runs:</p>
            <span>{props.runs.length}</span>
          </div>
          <div className="dashboard-side-stats-item">
            <p>Distance:</p>
            <span>{totalDistance(props.runs)} km</span>
          </div>
          <div className="dashboard-side-stats-item">
            <p>Duration:</p> <span>{totalDuration(props.runs)}</span>
          </div>
        </div>
        <div className="dashboard-side-nav">
          <Link
            to="/dashboard"
            className="dashboard-side-nav-item ui massive button"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/new"
            className="dashboard-side-nav-item ui massive button"
          >
            New run
          </Link>
          <Link
            to="/dashboard/runninglog"
            className="dashboard-side-nav-item ui massive button"
          >
            Running log
          </Link>
          <Link
            to="/dashboard"
            className="dashboard-side-nav-item ui massive button"
          >
            Edit profile
          </Link>

          <button
            className="dashboard-side-nav-item ui massive button"
            onClick={() => props.signOut()}
          >
            Sign out
          </button>
        </div>
        <div className="dashboard-side-footer">&copy; Gracjan Kolodziej</div>
      </div>
      <div className="dashboard-content">
        <DashboardContent dashboardRef={dashboardRef} runs={props.runs} />
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
})(Dashboard);
