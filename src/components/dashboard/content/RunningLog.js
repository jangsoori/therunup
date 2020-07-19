import React from "react";

//Redux
import { connect } from "react-redux";
//Components
import RunningLogList from "./RunningLogList";
//Utils
import moment from "moment";

//Main
function RunningLog(props) {
  //Sort runs (TODO: make that reusable function)
  let runs = props.runs.slice();
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
