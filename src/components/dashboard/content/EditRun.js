import React from "react";
import RunForm from "./RunForm";
import { editRun } from "../../../actions";
import { connect } from "react-redux";
function EditRun(props) {
  const { run } = props;
  if (!run) {
    return <div>loading...</div>;
  }
  const {
    name,
    description,
    durationSeconds,
    durationMin,
    durationH,
    distanceKm,
    distanceM,
  } = props.run;

  const onSubmit = (values) => {
    props.editRun(props.match.params.id, { ...values });
  };

  return (
    <div className="dashboard-edit-run">
      <div className="dashboard-subpage-content">
        <h1>Edit run</h1>
        <RunForm
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
