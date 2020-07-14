import React from "react";
import "./UserSummary.scss";
import { connect } from "react-redux";
function UserSummary(props) {
  if (!props.runList) {
    return null;
  }

  const totalRuns = props.runList.length;
  const totalDistance = (arr) => {
    return arr.reduce((a, b) => {
      return +a + +b.distance;
    }, 0);
  };
  const totalLength = (arr) => {
    return arr.reduce((a, b) => {
      return +a + +b.length;
    }, 0);
  };
  return (
    <div className="user-summary-wrapper">
      <div className="user-summary-content">
        <img src="https://i.pravatar.cc/150" alt="avatar" />
        <p>Gracjan Kołodziej</p>
        <div className="user-summary-runs">
          <div className="user-summary-runs-item">
            <p>Runs: </p>
            <span>{+totalRuns}</span>
          </div>
          <div className="user-summary-runs-item">
            <p>Distance: </p> <span>{+totalDistance(props.runList)} km</span>
          </div>
          <div className="user-summary-runs-item">
            <p>Length: </p> <span>{+totalLength(props.runList)} min</span>
          </div>
          <div className="user-summary-runs-item">Running Log</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    runList: state.firestore.ordered.runs,
  };
};

export default connect(mapStateToProps)(UserSummary);
