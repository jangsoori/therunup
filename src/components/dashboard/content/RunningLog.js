import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import RunningLogList from "./RunningLogList";
function RunningLog(props) {
  var runs = props.runs.slice();
  let sortedRuns = runs.sort((a, b) => {
    return moment(a.date) < moment(b.date);
  });
  return (
    <div className="dashboard-content-running-log">
      <h1 className="dashboard-content-title">Running log</h1>
      <RunningLogList runs={sortedRuns} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    runs: state.firestore.ordered.runs,
  };
};

export default connect(mapStateToProps)(RunningLog);
