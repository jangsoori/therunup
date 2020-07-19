import React from "react";
//Router
import { Link } from "react-router-dom";
//Styles
import "./RunList.scss";
//Utils
import moment from "moment";
//Components
import RunItem from "./RunItem";

function RunList(props) {
  //create copy of arr to prevent error (slice mutates array, cant do that on firestore)
  //(TODO: make that reusable function)
  let runs = props.runs.slice();
  //Sort runs from newest to oldest
  let sortedRuns = runs.sort((a, b) => {
    return moment(a.date) < moment(b.date);
  });

  //Render runs, if 0, show message
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
