import React from "react";
import { signOut } from "../../actions";
import { connect } from "react-redux";

function Dashboard(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.signOut();
        }}
      >
        LogOut
      </button>
    </div>
  );
}
export default connect(null, { signOut })(Dashboard);
