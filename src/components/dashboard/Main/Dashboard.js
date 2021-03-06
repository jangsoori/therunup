//React imports
import React, { useEffect, useRef, useState } from "react";

//React Router import
import { Link } from "react-router-dom";

//React Redux imports
import { connect } from "react-redux";

//Action imports
import { getUserRuns, getUserName } from "../../../actions/userActions";
import { signOut } from "../../../actions/authActions";
//Components
import DashboardContent from "./DashboardContent";
//Style imports
import "./Dashboard.scss";

//Utilities
import moment from "moment";
import useWindowDimensions from "../../../assets/hooks/useWindowDimensions";
//Main Component
function Dashboard(props) {
  const { height } = useWindowDimensions();

  //Dashboard ref for run item menu
  const dashboardRef = useRef(null);
  //Menu state
  const [menuVis, setMenuVis] = useState(false);
  //Fetch user name on page load
  useEffect(() => {
    if (props.userId) {
      props.getUserName(props.userId);
    }
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

  const determineButtonSize = () => {
    if (height > 600) {
      return "massive";
    } else if (height <= 600 && height > 500) {
      return "huge";
    } else if (height <= 500 && height > 450) {
      return "big";
    } else if (height <= 450) {
      return "small";
    }
  };
  return (
    <div
      className="dashboard-container"
      ref={dashboardRef}
      onClick={() => setMenuVis(false)}
    >
      <i
        className="bars icon menu-open big"
        onClick={(e) => {
          e.stopPropagation();
          setMenuVis(true);
        }}
      ></i>

      <div
        className={`dashboard-side ${menuVis ? "dashboard-side-visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <i
          className="close icon big menu-close"
          onClick={() => setMenuVis(false)}
        ></i>
        <div className="dashboard-side-user">
          <h3 className="dashboard-side-user-name">{`${props.user.firstName} ${props.user.lastName}`}</h3>
          <img
            src="https://i.pravatar.cc/150"
            className="dashboard-side-user-avatar"
            alt=""
          />
        </div>

        <div className="dashboard-side-stats">
          <div className="dashboard-side-stats-item">
            <p>Runs:</p>
            <span>{totalRuns}</span>
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
            onClick={() => setMenuVis(false)}
            to="/dashboard"
            className={`dashboard-side-nav-item ui ${determineButtonSize()} button`}
          >
            Dashboard
          </Link>
          <Link
            onClick={() => setMenuVis(false)}
            to="/dashboard/new"
            className={`dashboard-side-nav-item ui ${determineButtonSize()} button`}
          >
            New run
          </Link>
          <Link
            onClick={() => setMenuVis(false)}
            to="/dashboard/runninglog"
            className={`dashboard-side-nav-item ui ${determineButtonSize()} button`}
          >
            Running log
          </Link>
          <Link
            onClick={() => setMenuVis(false)}
            className={`dashboard-side-nav-item dashboard-dropdown ui ${determineButtonSize()} button`}
            to="/dashboard/settings"
          >
            Settings
          </Link>

          <button
            className={`dashboard-side-nav-item ui ${determineButtonSize()} button red sign-out-btn`}
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
