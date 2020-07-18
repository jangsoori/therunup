import React from "react";
import RunItem from "./RunItem";
import moment from "moment";
import { Link } from "react-router-dom";
import "./RunList.scss";
function RunList(props) {
  //create copy of arr to prevent error
  var runs = props.runs.slice();
  let sortedRuns = runs.sort((a, b) => {
    return moment(a.date) < moment(b.date);
  });

  const renderRuns = (runs) => {
    if (runs.length === 0) {
      return (
        <div style={{ justifySelf: "left" }}>
          You have no runs!{" "}
          <Link to="/dashboard/new">Click here to add one.</Link>
        </div>
      );
    }
    return runs.map((run) => {
      return <RunItem dbRef={props.dbRef} run={run} key={run.id} />;
    });
  };
  return <div className="run-list-wrapper">{renderRuns(sortedRuns)}</div>;
}

export default RunList;
