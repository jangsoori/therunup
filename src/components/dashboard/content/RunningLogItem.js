import React, { useRef } from "react";
import moment from "moment";
import "./RunningLogItem.scss";
import { deleteRun, editRun } from "../../../actions/runActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
function RunningLogItem(props) {
  const deleteRef = useRef(null);

  const {
    name,
    avgPace,
    date,
    description,
    totalDistanceMeters,
    totalDurationSeconds,
    id,
  } = props.run;

  const avgPaceTime = moment.duration(avgPace, "minutes")._data;
  const displayDuration = (duration) => {
    return moment.utc(duration * 1000).format("HH:mm:ss");
  };
  return (
    <div className="log-item-wrapper">
      <div className="log-item-content">
        <p className="log-item-content-item">{date}</p>
        <p className="log-item-content-item">{name}</p>
        <p className="log-item-content-item">
          {description ? description : "No description"}
        </p>
        <p className="log-item-content-item">
          {(totalDistanceMeters / 1000).toFixed(2)} km
        </p>
        <p className="log-item-content-item">
          {displayDuration(totalDurationSeconds)}
        </p>
        <p className="log-item-content-item">
          {avgPaceTime.minutes}:
          {avgPaceTime.seconds < 10
            ? `0${avgPaceTime.seconds}`
            : avgPaceTime.seconds}{" "}
          min/km
        </p>
        <div className="log-item-content-item">
          <Link
            to={{ pathname: `/dashboard/delete/${id}` }}
            ref={deleteRef}
            className="ui button red"
          >
            Delete
          </Link>
          <Link to={`/dashboard/edit/${id}`} className="ui button primary">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { deleteRun, editRun })(RunningLogItem);
