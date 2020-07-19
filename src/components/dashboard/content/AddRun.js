import React from "react";

//Components
import RunForm from "./RunForm";
//Actions
import { addRun } from "../../../actions/runActions";
//Redux
import { connect } from "react-redux";
//Utilities
import moment from "moment";

////////////////////////////////////////////
//MAIN///
function AddRun(props) {
  const onSubmit = (values) => {
    props.addRun({
      ...values,
      avgPace:
        values.totalDurationSeconds / 60 / (values.totalDistanceMeters / 1000),
      userId: props.userId,
      date: moment().format("DD MMMM YYYY, HH:mm"),
    });
  };
  return (
    <div className="dashboard-content-add-run">
      <h1 className="dashboard-content-title">New Run</h1>
      <RunForm onSubmit={onSubmit} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
  };
};
export default connect(mapStateToProps, { addRun })(AddRun);
