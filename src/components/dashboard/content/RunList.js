import React from "react";
import RunItem from "./RunItem";
import moment from "moment";
import history from "../../../history";
import "./RunList.scss";
function RunList(props) {
  //create copy of arr to prevent error
  var runs = props.runs.slice();
  let sortedRuns = runs.sort((a, b) => {
    return moment(a.date) < moment(b.date);
  });

  const renderRuns = (runs) => {
    if (!runs) {
      return null;
    }
    return runs.map((run) => {
      return <RunItem dbRef={props.dbRef} run={run} key={run.id} />;
    });
  };
  return <div className="run-list-wrapper">{renderRuns(sortedRuns)}</div>;
}

export default RunList;
