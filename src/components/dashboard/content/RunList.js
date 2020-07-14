import React from "react";
import RunItem from "./RunItem";

function RunList(props) {
  const renderRuns = (runs) => {
    if (!runs) {
      return null;
    }
    return runs.map((run) => {
      return <RunItem dbRef={props.dbRef} run={run} />;
    });
  };
  return <div className="run-list-wrapper">{renderRuns(props.runs)}</div>;
}

export default RunList;
