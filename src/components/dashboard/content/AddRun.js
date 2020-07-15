import React from "react";
import RunForm from "./RunForm";
import { addRun } from "../../../actions";
import { connect } from "react-redux";
import moment from "moment";
function AddRun(props) {
  const onSubmit = (values) => {
    console.log(values);

    props.addRun({
      ...values,
      avgPace:
        values.totalDurationSeconds / 60 / (values.totalDistanceMeters / 1000),
      userId: props.userId,
      date: moment().format("MMMM Do YYYY, HH:mm"),
    });
  };
  return (
    <div className="dashboard-add-run">
      <div className="dashboard-subpage-content">
        <h1>New Run</h1>
        <div className="add-run-wrapper">
          <RunForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
  };
};
export default connect(mapStateToProps, { addRun })(AddRun);
