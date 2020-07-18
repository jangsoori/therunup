import React, { useRef, useState } from "react";
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
    <tr>
      <td className="log-item-content-item">{date}</td>
      <td className="log-item-content-item">{name}</td>
      <td className="log-item-content-item">
        {description ? description : "No description"}
      </td>
      <td className="log-item-content-item">
        {(totalDistanceMeters / 1000).toFixed(2)} km
      </td>
      <td className="log-item-content-item">
        {displayDuration(totalDurationSeconds)}
      </td>
      <td className="log-item-content-item">
        {avgPaceTime.minutes}:
        {avgPaceTime.seconds < 10
          ? `0${avgPaceTime.seconds}`
          : avgPaceTime.seconds}{" "}
        min/km
      </td>
      <td className="log-item-content-item">
        <tr>
          <td>
            <Link
              to={{ pathname: `/dashboard/delete/${id}` }}
              ref={deleteRef}
              className="ui button big red"
            >
              Delete
            </Link>
          </td>
          <td>
            {" "}
            <Link
              to={`/dashboard/edit/${id}`}
              className="ui button big primary"
            >
              Edit
            </Link>
          </td>
        </tr>
      </td>
    </tr>
  );
}

export default connect(null, { deleteRun, editRun })(RunningLogItem);
