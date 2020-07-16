import React from "react";
import RunForm from "./RunForm";
import { addRun } from "../../../actions/runActions";
import { connect } from "react-redux";
import moment from "moment";
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
