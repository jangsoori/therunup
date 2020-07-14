import React from "react";
import "./Runs.scss";
import RunList from "./content/RunList";
import ReactPaginate from "react-paginate";
import { Route } from "react-router-dom";
export default function Runs(props) {
  return (
    <div className="dashboard-subpage-content runs-content">
      <h1>Runs</h1>
      <RunList dbRef={props.dbRef} runs={props.runs} />
    </div>
  );
}
