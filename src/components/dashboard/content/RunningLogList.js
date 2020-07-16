import React from "react";
import RunningLogItem from "./RunningLogItem";
import "./RunningLogList.scss";
export default function RunningLogList(props) {
  const renderRuns = (runs) => {
    return runs.map((run) => {
      return <RunningLogItem run={run} />;
    });
  };
  return (
    <div className="log-list-wrapper">
      <div className="log-list-header">
        <p className="log-list-header-item">Date</p>
        <p className="log-list-header-item">Title</p>
        <p className="log-list-header-item">Description</p>
        <p className="log-list-header-item">Distance</p>
        <p className="log-list-header-item">Time</p>
        <p className="log-list-header-item">Average pace</p>
        <p className="log-list-header-item">Actions</p>
      </div>
      {renderRuns(props.runs)}
    </div>
  );
}
