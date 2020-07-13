import React, { useEffect, useState } from "react";
import { signOut, logIn } from "../../actions";
import { connect } from "react-redux";
import { getUserInfo, getUserRuns, addRun } from "../../actions";
import "./Dashboard.scss";
import UserSummary from "./UserSummary";
function Dashboard(props) {
  useEffect(() => {
    props.getUserInfo(props.userId);

    // console.log(user);
  }, []); //Will only run once

  const [headerMenuVis, setHeaderMenuVis] = useState(false);
  console.log(headerMenuVis);
  return (
    <div className="dashboard-wrapper" onClick={() => setHeaderMenuVis(false)}>
      {/* Hide menu on click anywhere but menu icon */}
      <div className="dashboard-header">
        <h2 className="header-welcome">Hello, {props.user.firstName}</h2>
        <i
          className="fas fa-bars dashboard-profile-menu-btn"
          onClick={(e) => {
            //Stop event regarding setting state to false.
            e.stopPropagation();
            setHeaderMenuVis(!headerMenuVis);
          }}
        ></i>
        <div
          className={`dashboard-profile-menu ${headerMenuVis ? "visible" : ""}`}
        >
          <div className="dashboard-profile-menu-content">
            <button className="dashboard-profile-menu-item">View runs</button>
            <button className="dashboard-profile-menu-item">
              Edit profile
            </button>
            <button
              onClick={() => {
                props.signOut();
              }}
              className="dashboard-profile-menu-item"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* <button
          onClick={() =>
            props.addRun({
              name: "Evening run",
              description: "Not too bad",
              distance: 5,
              length: 30,
              avgPace: "6:00",
              userId: props.userId,
            })
          }
        >
          ds
        </button> */}
      </div>
      <div className="dashboard-profile-summary">
        <UserSummary />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    runs: state.firestore.data,
    user: state.user,
    userId: state.firebase.auth.uid,
  };
};
export default connect(mapStateToProps, {
  signOut,
  getUserInfo,
  getUserRuns,
  addRun,
})(Dashboard);
