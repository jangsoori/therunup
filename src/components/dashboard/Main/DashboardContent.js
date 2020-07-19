//React imports
import React from "react";
//React router imports
import { Link, Route } from "react-router-dom";
//Components imports
import Runs from "../RunManagement/Runs";
import AddRun from "../RunManagement/AddRun";
import EditRun from "../RunManagement/EditRun";
import DeleteRun from "../RunManagement/DeleteRun";
import Settings from "../Settings/Settings";
//Styles
import "./DashboardContent.scss";
import RunningLog from "../Running Log/RunningLog";
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
      <Route exact path="/dashboard/runninglog" component={RunningLog}></Route>
      <Route exact path="/dashboard/edit/:id" component={EditRun} />
      <Route exact path="/dashboard/delete/:id" component={DeleteRun} />
      <Route exact path="/dashboard/settings/" component={Settings} />
    </React.Fragment>
  );
}
