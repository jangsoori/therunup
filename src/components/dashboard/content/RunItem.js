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
  const [itemMenuVis, setItemMenuVis] = useState(false);
  const deleteRef = useRef(null);

  //Close menu on click outside of menu
  if (props.dbRef.current) {
    props.dbRef.current.onclick = (e) => {
      if (
        !e.target.classList.contains("run-item-menu-icon") &&
        !e.target.classList.contains("run-item-menu-content")
      )
        setItemMenuVis(false);
    };
  }

  const {
    avgPace,
    description,
    totalDistanceMeters,
    totalDurationSeconds,
    name,
    date,
    id,
  } = props.run;
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
                  // e.stopPropagation();
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
          <p>
            Distance: <span>{(totalDistanceMeters / 1000).toFixed(2)} km</span>
          </p>
          <p>
            Pace:{" "}
            <span>
              {avgPaceTime.minutes}:
              {avgPaceTime.seconds < 10
                ? `0${avgPaceTime.seconds}`
                : avgPaceTime.seconds}{" "}
              min/km
            </span>
          </p>
          <p>
            Time: <span>{displayDuration(totalDurationSeconds)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { deleteRun })(RunItem);
