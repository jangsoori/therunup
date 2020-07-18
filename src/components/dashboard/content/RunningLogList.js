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
      <table className="ui celled table striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Description</th>
            <th>Distance</th>
            <th>Time</th>
            <th>Pace</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderRuns(props.runs)}</tbody>{" "}
      </table>
    </div>
  );
}
