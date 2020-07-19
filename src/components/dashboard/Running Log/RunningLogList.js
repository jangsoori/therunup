import React from "react";
//Componetns
import RunningLogItem from "./RunningLogItem";
//Styles
import "./RunningLogList.scss";
//Main
export default function RunningLogList(props) {
  //Render run list function
  const renderRuns = (runs) => {
    return runs.map((run) => {
      return <RunningLogItem key={run.id} run={run} />;
    });
  };
  return (
    //Render table
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
        <tbody>{renderRuns(props.runs)}</tbody>
      </table>
    </div>
  );
}
