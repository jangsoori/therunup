import React from "react";
import "./Runs.scss";
import RunList from "./RunList";

export default function Runs(props) {
  return (
    <div className="dashboard-content-runs">
      <h1 className="dashboard-content-title">Runs</h1>
      <RunList dbRef={props.dbRef} runs={props.runs} />
    </div>
  );
}
