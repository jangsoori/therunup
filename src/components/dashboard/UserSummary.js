import React from "react";
import "./UserSummary.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function UserSummary(props) {
  if (!props.runList) {
    return null;
  }

  const totalRuns = props.runList.length;
  const totalDistance = (arr) => {
    const total = arr.reduce((a, b) => {
      return +a + +b.totalDistanceMeters;
    }, 0);
    return total / 1000;
  };
  const totalLength = (arr) => {
    const total = arr.reduce((a, b) => {
      return +a + +b.totalDurationSeconds;
    }, 0);
    return total / 60;
  };
  return (
    <div className="user-summary-wrapper">
      <div className="user-summary-content">
        <img src="https://i.pravatar.cc/150" alt="avatar" />
        <p>
          {props.user.firstName} {props.user.lastName}
        </p>
        <div className="user-summary-runs">
          <div className="user-summary-runs-item">
            <p>Runs: </p>
            <span>{+totalRuns}</span>
          </div>
          <div className="user-summary-runs-item">
            <p>Distance: </p>{" "}
            <span>{(+totalDistance(props.runList)).toFixed(2)} km</span>
          </div>
          <div className="user-summary-runs-item">
            <p>Length: </p> <span>{+totalLength(props.runList)} min</span>
          </div>
          <div className="user-summary-runs-item-btn">Running Log</div>
          <Link to="/dashboard/new" className="user-summary-runs-item-btn">
            New run
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    runList: state.firestore.ordered.runs,
    auth: state.firebase.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserSummary);
