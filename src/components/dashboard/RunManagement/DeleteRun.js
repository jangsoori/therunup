import React, { useState } from "react";

//Actions
import { deleteRun } from "../../../actions/runActions";

//Redux
import { connect } from "react-redux";

//Styles
import { Modal } from "semantic-ui-react";

//Utilities
import history from "../../../history";
/////////////////////////////////////
//MAIN
function DeleteRun(props) {
  //State management for opening modal.
  const [open, setOpen] = useState(true);
  //Close modal
  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <div className="header">
        <h1>Delete run</h1>
      </div>
      <div className="content">
        <h2>Are you sure you want to delete this run?</h2>
      </div>
      <div className="actions">
        <div
          className="ui button massive red"
          onClick={() => props.deleteRun(props.match.params.id)}
        >
          Yes
        </div>
        <div
          className="ui button massive green"
          onClick={() => history.goBack()}
        >
          No
        </div>
      </div>
    </Modal>
  );
}

export default connect(null, { deleteRun })(DeleteRun);
