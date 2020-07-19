import React from "react";

//Components
import RunForm from "./RunForm";
//Actions
import { editRun } from "../../../actions/runActions";
//Redux
import { connect } from "react-redux";

//////////////////////////////////////////
//Main

function EditRun(props) {
  const { run } = props;
  //Wait for runs to load
  if (!run) {
    return <div>loading...</div>;
  }
  //Get property values from single run
  const {
    name,
    description,
    durationSeconds,
    durationMin,
    durationH,
    distanceKm,
    distanceM,
  } = props.run;

  //Handle submit case
  const onSubmit = (values) => {
    props.editRun(props.match.params.id, {
      ...values,
      avgPace:
        values.totalDurationSeconds / 60 / (values.totalDistanceMeters / 1000),
    });
  };

  return (
    <div className="dashboard-content-edit-run">
      <h1 className="dashboard-content-title">Edit run</h1>
      <RunForm
        //Set initial values on the form
        initialValues={{
          name: name,
          description: description,
          durationSeconds: durationSeconds,
          durationMin: durationMin,
          durationH: durationH,
          distanceKm: distanceKm,
          distanceM: distanceM,
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  if (!state.firestore.data.runs) {
    return {};
  }
  return {
    run: state.firestore.data.runs[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, { editRun })(EditRun);
