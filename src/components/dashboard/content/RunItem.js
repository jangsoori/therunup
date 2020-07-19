import React, { useState, useRef, createRef } from "react";
import { deleteRun } from "../../../actions/runActions";
import { connect } from "react-redux";
import moment from "moment";
import "./RunItem.scss";
import { Link } from "react-router-dom";
const displayDuration = (duration) => {
  return moment.utc(duration * 1000).format("HH:mm:ss");
};

function RunItem(props) {
  //Handle pop out menu state
  const [itemMenuVis, setItemMenuVis] = useState(false);
  //Get ref for delete button to use it in modal in Delete Run component
  const deleteRef = useRef(null);

  //Close menu on click outside of menu (get ref for dashboard)
  if (props.dbRef.current) {
    props.dbRef.current.onclick = (e) => {
      if (
        !e.target.classList.contains("run-item-menu-icon") &&
        !e.target.classList.contains("run-item-menu-content")
      )
        setItemMenuVis(false);
    };
  }
  //Get values from run state
  const {
    avgPace,
    description,
    totalDistanceMeters,
    totalDurationSeconds,
    name,
    date,
    id,
  } = props.run;
  //Convert decimal avgPace to time
  const avgPaceTime = moment.duration(avgPace, "minutes")._data;
  return (
    <div className="run-item-wrapper">
      <div className="run-item">
        <div className="run-item-header">
          <div className="run-item-header-left">
            <h3>{name}</h3>
            <p>{description}</p>
            <span>{date}</span>
          </div>
          <div className="run-item-header-right">
            <div className={`run-item-menu`}>
              <i
                onClick={(e) => {
                  setItemMenuVis(!itemMenuVis);
                }}
                className="fas fa-ellipsis-h run-item-menu-icon"
              ></i>
              <div
                className={`run-item-menu-content  ${
                  itemMenuVis ? "active" : ""
                }`}
              >
                <Link to={`/dashboard/edit/${id}`}>Edit run</Link>
                <Link
                  to={{
                    pathname: `/dashboard/delete/${id}`,
                  }}
                  ref={deleteRef}
                >
                  Delete run
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="run-item-img">
          <img src="https://via.placeholder.com/600x200" alt="" />
        </div>
        <div className="run-item-detail">
          <div className="run-item-detail-text">
            <p>Distance </p>
            <span>{(totalDistanceMeters / 1000).toFixed(2)} km</span>
          </div>
          <div className="run-item-detail-text">
            <p>Pace</p>

            <span>
              {/* Time formating */}
              {avgPaceTime.minutes}:
              {avgPaceTime.seconds < 10
                ? `0${avgPaceTime.seconds}`
                : avgPaceTime.seconds}{" "}
              min/km
            </span>
          </div>
          <div className="run-item-detail-text">
            <p>Time</p>
            <span>{displayDuration(totalDurationSeconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { deleteRun })(RunItem);
