import React, { useRef, useState } from "react";
import moment from "moment";
import "./RunningLogItem.scss";
import { deleteRun, editRun } from "../../../actions/runActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const avgPaceTime = (avgPace) => moment.duration(avgPace, "minutes")._data;
const displayDuration = (duration) => {
  return moment.utc(duration * 1000).format("HH:mm:ss");
};
function RunningLogItem(props) {
  //Ref for accessing button in modal
  const deleteRef = useRef(null);

  //Get properties from single run
  const {
    name,
    avgPace,
    date,
    description,
    totalDistanceMeters,
    totalDurationSeconds,
    id,
  } = props.run;
  console.log(avgPaceTime(avgPace));
  console.log(1200 / 60 / (5000 / 1000));
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
        {avgPaceTime(avgPace).minutes}:
        {avgPaceTime(avgPace).seconds < 10
          ? `0${avgPaceTime(avgPace).seconds}`
          : avgPaceTime(avgPace).seconds}{" "}
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
