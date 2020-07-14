import React from "react";
import RunList from "./RunList";
import { Form, Field } from "react-final-form";
import RunForm from "./RunForm";
import { addRun } from "../../../actions";
import { connect } from "react-redux";
import moment from "moment";
function AddRun(props) {
  const onSubmit = (values) => {
    props.addRun({
      ...values,
      avgPace: values.length / values.distance,
      userId: props.userId,
      date: moment().format("MMMM Do YYYY"),
    });
  };
  return (
    <div className="dashboard-subpage-content">
      <h1>New Run</h1>
      <div className="add-run-wrapper">
        <RunForm onSubmit={onSubmit} />
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
