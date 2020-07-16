//React imports
import React from "react";
//React router imports
import { Link, Route } from "react-router-dom";
//Components imports
import Runs from "./Runs";
import AddRun from "./content/AddRun";
import EditRun from "./content/EditRun";
import DeleteRun from "./content/DeleteRun";
//Styles
import "./DashboardContent.scss";
export default function DashboardContent(props) {
  return (
    <React.Fragment>
      <Route
        exact
        path="/dashboard"
        //Pass props to the component
        render={() => <Runs dbRef={props.dashboardRef} runs={props.runs} />}
      />
      <Route exact path="/dashboard/new" component={AddRun}></Route>
      <Route exact path="/dashboard/edit/:id" component={EditRun} />
      <Route exact path="/dashboard/delete/:id" component={DeleteRun} />
    </React.Fragment>
  );
}
