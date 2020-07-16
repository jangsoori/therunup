import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteRun } from "../../../actions/runActions";
import history from "../../../history";
import { Modal } from "semantic-ui-react";

function DeleteRun(props) {
  console.log(props);

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      {/* <Header icon="archive" content="Delete run" />
      <Modal.Content>
        <p>Are you sure you want to delete this run?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => props.deleteRun(props.match.params.id)}
        >
          Yes
        </Button>
        <Button color="green" onClick={() => history.push("/")}>
          No
        </Button>
      </Modal.Actions> */}

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
          onClick={() => history.push("/")}
        >
          No
        </div>
      </div>
    </Modal>
  );
}

export default connect(null, { deleteRun })(DeleteRun);
